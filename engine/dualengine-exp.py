from fastapi import FastAPI, UploadFile, File
import io
import pandas as pd
import numpy as np
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error

app = FastAPI()
# regional avocado sales dataset : {https://www.kaggle.com/datasets/neuromusic/avocado-prices?resource=download}
@app.post("/validate_engine")
async def validate_engine(file: UploadFile = File(...)):
    contents = await file.read()
    df_raw = pd.read_csv(io.BytesIO(contents))
    
    df_all = df_raw[df_raw['type'] == 'organic'].copy()
    regions = df_all['region'].unique().tolist()
    
    detailed_results = []
    periods = 20
    
    print(f"Starting validation on {len(regions)} regions...")

    for region in regions:
        try:
            df = df_all[df_all['region'] == region].sort_values('Date')
            if len(df) < 50: continue
            
            df['y'] = df['Total Volume']
            df['ds'] = pd.to_datetime(df['Date'])
            
            train = df.iloc[:-periods]
            test = df.iloc[-periods:]
            
            # Baseline: ARIMA
            a_model = ARIMA(train['y'].values, order=(5, 1, 0)).fit()
            a_fore = a_model.forecast(steps=periods)
            rmse_base = np.sqrt(mean_squared_error(test['y'], a_fore))
            
            # Challenger: Prophet
            p_df = train[['ds', 'y']].copy()
            p_model = Prophet(daily_seasonality=False, weekly_seasonality=True, yearly_seasonality=True)
            p_model.fit(p_df)
            forecast = p_model.predict(p_model.make_future_dataframe(periods=periods, freq="W"))
            rmse_prophet = np.sqrt(mean_squared_error(test['y'], forecast.tail(periods)['yhat'].values))
            
            # Arbitration Logic
            best_rmse = min(rmse_base, rmse_prophet)
            improvement = ((rmse_base - best_rmse) / rmse_base) * 100
            
            if np.isfinite(improvement):
                detailed_results.append({
                    "region": region,
                    "rmse_baseline": round(rmse_base, 2),
                    "rmse_farms": round(best_rmse, 2),
                    "improvement_pct": round(improvement, 2)
                })
                
        except Exception:
            continue

    if not detailed_results:
        return {"error": "Validation failed"}

    avg_imp = np.mean([r['improvement_pct'] for r in detailed_results])
    
    return {
        "regions_processed": len(detailed_results),
        "aggregated_improvement": f"{round(avg_imp, 2)}%",
        "region_breakdown": detailed_results
    }