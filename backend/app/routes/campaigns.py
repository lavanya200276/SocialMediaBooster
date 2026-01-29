from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas import CampaignCreate

router = APIRouter(
    prefix="/campaigns",
    tags=["Campaigns"]
)

@router.post("/")
def create_campaign(campaign: CampaignCreate):
    response = supabase.table("campaigns").insert({
        "name": campaign.name,
        "budget": campaign.budget,
        "platform": campaign.platform
    }).execute()

    if response.data is None:
        raise HTTPException(status_code=400, detail="Failed to create campaign")

    return response.data[0]


@router.get("/")
def get_campaigns():
    response = supabase.table("campaigns").select("*").execute()
    return response.data

@router.put("/{campaign_id}")
def update_campaign(campaign_id: str, campaign: CampaignCreate):
    response = (
        supabase.table("campaigns")
        .update({
            "name": campaign.name,
            "budget": campaign.budget,
            "platform": campaign.platform
        })
        .eq("id", campaign_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Campaign not found")

    return response.data[0]


# DELETE campaign
@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: str):
    response = (
        supabase.table("campaigns")
        .delete()
        .eq("id", campaign_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Campaign not found")

    return {"message": "Campaign deleted"}
