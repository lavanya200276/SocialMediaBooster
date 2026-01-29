from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import campaigns
import requests

app = FastAPI(title="Social Booster Demo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(campaigns.router)

@app.get("/")
def root():
    return {"status": "API running"}

@app.get("/convert-budget")
def convert_budget(amount: float):
    response = requests.get("https://open.er-api.com/v6/latest/INR")
    data = response.json()

    # safety check
    if data.get("result") != "success":
        raise HTTPException(status_code=500, detail="Currency API failed")

    usd_rate = data["rates"]["USD"]

    return {
        "inr": amount,
        "usd": round(amount * usd_rate, 2)
    }