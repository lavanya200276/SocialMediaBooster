****# SocialMediaBooster
Campaign Management System


# Social Media Booster

A full-stack web application to manage social media ad campaigns with budget tracking, reporting, and third-party API integration.

---

##  Tech Stack

### Frontend
- React
- Vite
- Chart.js
- Axios

### Backend
- FastAPI
- Python
- SQLite

---

## Features

- Create, view, update, and delete campaigns
- Campaign budget visualization (charts)
- Third-party API integration for currency conversion (INR → USD)
- Responsive UI
- REST API backend

---

##  Third-Party API Integration

**Currency Conversion API**

- Converts campaign budget from INR to USD
- Triggered from UI using the **USD** button
- Backend calls an external exchange-rate API and returns converted value

Example endpoint:

GET /convert-budget?amount=1000


---

##  Live Deployment

- **Frontend**: https://social-media-booster-rose.vercel.app/
- **Backend**: https://socialmediabooster.onrender.com/

---

Local Setup
Prerequisites

Node.js v18+

Python v3.9+

Git

Clone Repos
# Frontend
git clone https://github.com/<your-username>/social-media-booster-frontend.git
# Backend
git clone https://github.com/<your-username>/social-media-booster-backend.git

Environment Variables

Backend .env.example

CURRENCY_API_URL=https://open.er-api.com/v6/latest/INR
DATABASE_URL=sqlite:///./app.db

Database & Migrations
# Activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run migrations (create database tables)
python -m app.db_init

Running Backend Locally
cd backend
uvicorn app.main:app --reload


Backend runs at: http://127.0.0.1:8000

Running Frontend Locally
cd frontend
npm install
npm run dev


Frontend runs at: http://localhost:5173

*  How to Test
-> CRUD Operations

Open live frontend URL

Go to Campaigns page

Click Create Campaign → fill in details → Save

View the list of campaigns

Click Edit to update a campaign → Save

Click Delete to remove a campaign

-> Report / Visualization

Navigate to Reports page

Budget charts display live data from the database

-> Third-Party API Feature

Click USD button on a campaign budget

Backend converts INR → USD using currency API and shows result

->  Deployment Notes

Frontend: Hosted on [Vercel/Netlify/AWS Amplify]

Backend: Hosted on [AWS EC2/Azure App Service/GCP App Engine]

Ensure CORS is enabled in backend for frontend domain

Environment variables must be set in hosting platform


Frontend runs at:

http://localhost:5173********
