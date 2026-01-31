from fastapi import FastAPI
from fastapi import Query
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
    usd_rate = 0.012   # fixed simple rate
    return {
        "inr": amount,
        "usd": round(amount * usd_rate, 2)
    }
