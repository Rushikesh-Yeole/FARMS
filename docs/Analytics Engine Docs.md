To improve the readability and visual appeal of your Markdown documentation for **GitHub**, you’ll need to apply proper spacing, consistent indentation, syntax highlighting, and structure-friendly formatting. Here's your **cleaned-up and GitHub-optimized version** of the documentation:

---

# FARMS Analytics Engine Documentation

## Overview

The **FARMS Analytics Engine**, built with **FastAPI**, powers **Phase 2** of the Framework for Analytics & Real-Time Market Synchronisation (FARMS). It provides real-time data aggregation, predictive analytics, and actionable insights for agricultural supply chains.

The engine integrates with **MongoDB** for data storage and leverages **Prophet** and **ARIMA** models for demand forecasting, enabling **farmers, retailers, and transporters** to optimize operations.

This document outlines the engine’s endpoints, data models, and usage — designed for scalability and seamless integration with the FARMS ecosystem.

> 📌 [FARMS Analytics Engine Repository](https://github.com/Rushikesh-Yeole/FARMS)

---

## Tech Stack

* **Framework**: FastAPI
* **Database**: MongoDB (via `motor` for async operations)
* **Machine Learning**: Prophet, ARIMA (`prophet`, `statsmodels`)
* **Environment**: Python 3.8+, managed via `.env`
* **Dependencies**: `pandas`, `numpy`, `sklearn`, `pydantic`, `python-dotenv`

---

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd farms-analytics-engine
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file:

```env
MONGODB_URI=mongodb://<host>:<port>
DB_NAME=farms_db
PDB_NAME=farms_pdb
```

### 4. Run the Server

```bash
uvicorn main:app --reload
```

---

## Data Model

The engine uses a **Pydantic model** for structured input:

```python
class update(BaseModel):
    region: str        # Region name (e.g., "punjab")
    product: str       # Product name (e.g., "wheat")
    time: str          # ISO 8601 timestamp (e.g., "2025-07-14T14:30:00")
    post: int          # Quantity posted (supply)
    demand: int        # Quantity demanded
```

### MongoDB Collections

* `regions`: Region-specific product data, trends, and aggregates
* `mdata`: Aggregated supply/demand data
* `retailers`: Retailer-specific demand & spoilage tracking

---

## API Endpoints

> Base URL: `/` (Landing page provides an HTML overview)

---

### 1. `HEAD /`

* **Description**: Health check
* **Response**: `200 OK`

```bash
curl -I http://localhost:8000/
```

---

### 2. `GET /`

* **Description**: Returns HTML landing page
* **Response**: Endpoint overview

```bash
curl http://localhost:8000/
```

---

### 3. `POST /add`

* **Description**: Adds/updates region supply & demand
* **Request**:

```json
{
  "region": "punjab",
  "product": "wheat",
  "time": "2025-07-14T14:30:00",
  "post": 100,
  "demand": 120
}
```

* **Response**:

```json
{
  "success": true,
  "message": "Product data updated successfully."
}
```

* **Errors**:
  `400 Bad Request`: Invalid timestamp

---

### 4. `GET /mdata`

* **Description**: Syncs regional data to `mdata` for analytics
* **Response**:

```json
{
  "success": true,
  "message": "Sync complete",
  "Updates": 5
}
```

* **Errors**:
  `404 Not Found`: No regions in DB

---

### 5. `POST /reset`

* **Description**: Resets data for a region
* **Request**:

```json
{
  "region": "punjab"
}
```

* **Response**:

```json
{
  "message": "punjab is Reset"
}
```

* **Errors**:
  `404 Not Found`: Region not found

---

### 6. `POST /insights`

* **Description**: Provides demand-supply insights
* **Request**:

```json
{
  "region": "punjab",
  "product": "wheat"
}
```

* **Response**:

```json
{
  "product": "wheat",
  "message": "Demand for Wheat in Punjab exceeds supply by 20.00% units. Consider stocking more.",
  "percent_gap": "20.00%"
}
```

---

### 7. `POST /optisights`

* **Description**: Forecasts future supply-demand gaps using ML
* **Request**:

```json
{
  "region": "punjab",
  "product": "wheat",
  "period": 4
}
```

* **Response**:

```json
{
  "product": "wheat",
  "model": "Prophet",
  "message": "Supply for Wheat in Punjab will probably exceed demand by 15.50%. Consider Scaling down!",
  "predicted_gap": 150.25,
  "percent_gap": "15.50%"
}
```

* **Errors**:
  `404 Not Found`: Not enough data

---

### 8. `POST /addDemand`

* **Description**: Adds retailer demand & spoilage window
* **Request**:

```json
{
  "id": "retailer123",
  "product": "wheat",
  "time": "2025-07-14T14:30:00",
  "demand": 50,
  "spoilTime": 7
}
```

* **Response**:

```json
{
  "success": true,
  "message": "wheat Demand for retailer123 added successfully."
}
```

---

### 9. `GET /narrowInsights/{rid}`

* **Description**: Retailer-specific spoilage insights
* **Path Parameter**: `rid` (e.g., `retailer123`)
* **Response**:

```json
{
  "state": 1,
  "insights": [
    ["wheat", "⚠️ wheat is experiencing high spoilage (25.00%) in last 30 Days! Consider reducing stock."]
  ]
}
```

* **Errors**:
  `404 Not Found`: Retailer not found

---

## Error Handling

* Standard HTTP codes: `200`, `400`, `404`, etc.
* Errors return descriptive JSON for easier debugging

---

## Security

* **CORS**: Configured for specific origins (e.g., `https://farms-glmv.onrender.com/`)
* **Env Variables**: Secrets like `MONGODB_URI` stored in `.env`

---

## Scalability

* **Async MongoDB**: via `motor`
* **Modular API**: Easy to add new features
* **Dynamic Forecasting**: Chooses best model (Prophet or ARIMA) using RMSE

---

## Future Enhancements

* Add **authentication/authorization**
* Integrate **real-time external data feeds** (weather, prices)
* Add **LSTM or deep learning** for improved forecasts

> 🌟That's It! 