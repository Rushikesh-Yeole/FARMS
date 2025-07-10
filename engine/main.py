from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from datetime import datetime, timedelta
import os
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
load_dotenv()

app = FastAPI()

# MongoDB
client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db_name = os.getenv("DB_NAME", "default_db")
pdb_name = os.getenv("PDB_NAME")
db = client[db_name]
pdb = client[pdb_name]

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://farmsv0.onrender.com",
    "https://farms-glmv.onrender.com",
    "https://farms-kfu1.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.head("/")
async def head_root():
    return Response(status_code=200)

@app.get("/", response_class=HTMLResponse)
async def landing_page():
    html_content = """
<html>
  <head>
    <title>FARMS Insights Engine</title>
  </head>
  <body>
    <h1>FARMS Insights Engine</h1>
    <p>Endpoints:</p>
    <ul>
      <li><b>/add</b> - POST: Add product data</li>
      <li><b>/insight</b> - GET: Retrieve product insights</li>
      <li><b>/forecast</b> - POST: Get product demand forecasts</li>
      <li><b>/insights</b> - GET: Generate product-specific insights</li>
      <li><b>/optisights</b> - GET: Fetch optimal supply and demand insights</li>
      <li><b>/mdata</b> - GET: Sync MongoDB data</li>
      <li><b>/narrowInsights/{'{rid}'}</b> - GET: Detailed spoilage insights for a retailer</li>
      <li><b>/reset</b> - POST: Reset region data</li>
    </ul>
    <footer>
      <p>FARMS Insights Engine 🧠</p>
    </footer>
  </body>
</html>
"""
    return HTMLResponse(content=html_content)

class update(BaseModel):
    region: str
    product: str
    time: str
    post: int
    demand: int    

@app.post("/add")
async def add(data: update):
    data.region = data.region.lower()
    data.product = data.product.lower()
    try:
        time_val = datetime.fromisoformat(data.time)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid timestamp format. Use ISO 8601.")
    qry = {
        "$set": {
            f"products.{data.product}.product": data.product,
            "updated": time_val
        },
        "$inc": {
            f"products.{data.product}.total_posted": data.post,
            f"products.{data.product}.total_demanded": data.demand
        },
        "$push": {
            f"products.{data.product}.trends": {
                "timestamp": time_val,
                "post": data.post,
                "demand": data.demand
            }
        },
        "$setOnInsert": {"region": data.region},
    }
    res = await db.regions.update_one({"region": data.region}, qry, upsert=True)
    if res.matched_count:
        return {"success": True, "message": "Product data updated successfully."}
    return {"success": True, "message": "Region and product added successfully."}

@app.get("/mdata")
async def mdata():
    regs = await db.regions.find({}, {"_id": 0, "region": 1, "products": 1}).to_list(None)
    if not regs:
        raise HTTPException(status_code=404, detail="No regions found.")
    upd_count = 0
    now_ts = datetime.utcnow().isoformat()
    for r in regs:
        reg_name = r["region"]
        for prod in r.get("products", {}).values():
            prod_name = prod.get("product")
            tot_demand = int(prod.get("total_demanded", 0))
            tot_post = int(prod.get("total_posted", 0))
            await db.mdata.update_one(
                {"region": reg_name},
                {
                    "$setOnInsert": {"region": reg_name},
                    "$push": {
                        f"products.{prod_name}": {
                            "total_post": tot_post,
                            "total_demand": tot_demand,
                            "timestamp": now_ts
                        }
                    }
                },
                upsert=True
            )
        upd_count += 1
    return {"success": True, "message": "Sync complete", "Updates": upd_count}

@app.post("/reset")
async def reset(request: Request):
    body = await request.json()
    reg = body.get("region")
    obj = await db.regions.delete_one({"region": reg})
    if obj.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"{reg} not found.")
    return {"message": f"{reg} is Reset"}

@app.post("/insights")
async def insights(request: Request):
    body = await request.json()
    reg = body.get("region").lower()
    prod = body.get("product").lower()
    reg_data = await db.regions.find_one({"region": reg}, {"_id": 0, "products": 1})
    if not reg_data:
        raise HTTPException(status_code=404, detail=f"Region '{reg}' not found.")
    prod_data = reg_data["products"].get(prod)
    if not prod_data:
        raise HTTPException(status_code=404, detail=f"Product '{prod}' not found in region '{reg}'.")
    tot_post = prod_data.get("total_posted", 0)
    tot_demand = prod_data.get("total_demanded", 0)
    if tot_demand > tot_post:
        demand_shortage = (tot_demand - tot_post) / tot_post * 100
        insight_message = f"Demand for {prod.capitalize()} in {reg.capitalize()} exceeds supply by {demand_shortage:.2f}% units. Consider stocking more."
    else:
        surplus = (tot_post - tot_demand) / tot_demand * 100
        insight_message = f"Supply for {prod.capitalize()} in {reg.capitalize()} exceeds demand by {surplus:.2f}% units. Consider reducing stock."
    return {"product": prod, "message": insight_message, "percent_gap": f"{surplus:.2f}%"}

@app.post("/optisights")
async def optisights(request: Request):
    body = await request.json()
    reg = body["region"].lower()
    prod = body["product"].lower()
    periods = int(body["period"])
    reg_data = await db.regions.find_one({"region": reg}, {"_id": 0, "products": 1}) or {}
    mdata_reg = await db.mdata.find_one({"region": reg}, {"_id": 0, "products": 1}) or {}
    prod_data = reg_data.get("products", {}).get(prod, {})
    trends = prod_data.get("trends", []) + [
        {"timestamp": entry["timestamp"], "post": entry["total_post"], "demand": entry["total_demand"]}
        for entry in mdata_reg.get("products", {}).get(prod, [])
    ]
    tot_demand = prod_data.get("total_demanded", 0) + sum(entry["total_demand"] for entry in mdata_reg.get("products", {}).get(prod, []))
    if len(trends) < periods:
        raise HTTPException(status_code=404, detail={"message": f"Can't predict {periods} weeks!", "info": f"Max: {len(trends)} weeks."})
    df = pd.DataFrame([{"ds": t["timestamp"], "y": t["demand"] - t["post"]} for t in trends])
         # Prophet forecasting
    p_model = Prophet().fit(df)
    fut = p_model.make_future_dataframe(periods=periods, freq="7D")
    p_pred = p_model.predict(fut)[["ds", "yhat"]].tail(periods)
    p_rmse = np.sqrt(mean_squared_error(df["y"].tail(periods), p_pred["yhat"]))
    # ARIMA forecasting
    a_model = ARIMA(df["y"], order=(5, 1, 0)).fit()
    a_fore = a_model.forecast(steps=periods)
    a_rmse = np.sqrt(mean_squared_error(df["y"].tail(periods), a_fore))
    if p_rmse < a_rmse:
        best_model = "Prophet"
        predictions = p_pred
    else:
        best_model = "ARIMA"
        predictions = pd.DataFrame({
            "ds": pd.date_range(df["ds"].iloc[-1], periods=periods, freq="h"),
            "yhat": a_fore
        })
    predicted_gap = predictions["yhat"].sum()
    percentage_gap = (predicted_gap / tot_demand) * 100 if tot_demand else 0
    if percentage_gap > 0:
        insight = f"Supply for {prod.capitalize()} in {reg.capitalize()} will probably exceed demand by {percentage_gap:.2f}%. Consider Scaling down !"
    else:
        insight = f"Demand for {prod.capitalize()} in {reg.capitalize()} will probably exceed supply by {-percentage_gap:.2f}%. Consider Prioritizing !"
    return {
        "product": prod,
        "model": best_model,
        "message": insight,
        "predicted_gap": round(predicted_gap, 2),
        "percent_gap": f"{round(percentage_gap, 2)}%"
    }

@app.post("/addDemand")
async def addDemand(request: Request):
    body = await request.json()
    rid = str(body.get("id"))
    prod = body.get("product").lower()
    tstamp = body.get("time")
    dem = int(body.get("demand"))
    spoilT = int(body.get("spoilTime", 0))
    await pdb.retailers.update_one(
        {"rid": rid},
        {
            "$setOnInsert": {"rid": rid},
            "$push": {f"products.{prod}.trends": {"timestamp": tstamp, "demanded_quantity": dem}}
        },
        upsert=True
    )
    if spoilT !=0:
        await pdb.retailers.update_one(
        {"rid": rid},
        {"$set": {f"products.{prod}.spoilTime": spoilT},},
        upsert=True
        )

    return {"success": True, "message": f"{prod} Demand for {rid} added successfully."}

@app.get("/narrowInsights/{rid}")
async def narrowInsights(rid: str):
    retailer = await pdb.retailers.find_one({"rid": rid})
    if not retailer:
        raise HTTPException(status_code=404, detail="Retailer not found")
    insights = []
    now = datetime.utcnow()
    one_month_ago = now - timedelta(days=30)
    maxSpoil = 50
    maxEvent = 4
    for prod, data in retailer.get("products", {}).items():
        trends = data.get("trends", [])
        spoil_time = data.get("spoilTime", 0)
        recent_trends = []
        for t in trends:
            try:
                t_dt = datetime.strptime(t["timestamp"], "%Y-%m-%dT%H:%M:%S")
            except Exception as e:
                continue
            if t_dt >= one_month_ago:
                recent_trends.append(t)
        spoilevents = 0
        tot_spoiled = 0
        for i in range(1, len(recent_trends)):
            prev = recent_trends[i-1]["demanded_quantity"]
            curr = recent_trends[i]["demanded_quantity"]
            try:
                dt1 = datetime.strptime(recent_trends[i]["timestamp"], "%Y-%m-%dT%H:%M:%S")
                dt2 = datetime.strptime(recent_trends[i-1]["timestamp"], "%Y-%m-%dT%H:%M:%S")
            except:
                continue
            gap = (dt1 - dt2).days
            if gap > spoil_time and (prev - curr) > maxSpoil:
                spoilevents += 1
                tot_spoiled += (prev - curr)
        if spoilevents >= maxEvent:
            tot_recent = sum(x["demanded_quantity"] for x in recent_trends)
            percentage = (tot_spoiled / tot_recent * 100) if tot_recent else 0
            insights.append([prod,f"⚠️ {prod} is experiencing high spoilage ({percentage:.2f}%) in last 30 Days! Consider reducing stock."])
    state = 1 if  insights else 0
    return {"state":state,"insights": insights if insights else [["No significant spoilage trends detected."]]}
