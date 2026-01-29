from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class CampaignCreate(BaseModel):
    name: str
    budget: int
    platform: str

class CampaignResponse(BaseModel):
    id: UUID
    name: str
    budget: int
    platform: str
    created_at: datetime

