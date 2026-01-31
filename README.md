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

##  Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Git

---

##  Environment Variables

Create `.env` files based on the example below.

### Backend `.env.example`


CURRENCY_API_URL= https://socialmediabooster.onrender.com/convert-budget?amount=1000


---

##  Running Backend Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload


Backend runs at:

http://127.0.0.1:8000

Running Frontend Locally
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173********
