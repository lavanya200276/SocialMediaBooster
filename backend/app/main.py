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
    url = "https://api.exchangerate.host/latest?base=INR"
    response = requests.get(url)
    data = response.json()

    usd_rate = data["rates"]["USD"]
    usd_amount = round(amount * usd_rate, 2)

    return {
        "inr": amount,
        "usd": usd_amount
    }