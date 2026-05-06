# Disaster Preparedness Full Stack Project

React (Vite) + Node.js + MySQL | Deployed on Vercel + Render + Aiven

## 📁 Project Structure

```
/
├── frontend/          ← Deploy this folder to Vercel
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── backend/           ← Deploy this folder to Render
    ├── config/db.js
    ├── routes/
    ├── server.js
    └── package.json
```

## 🚀 Deployment Instructions

### 1. Vercel (Frontend)
1. Go to vercel.com → New Project → Import your GitHub repo
2. **IMPORTANT:** Set Root Directory to `frontend`
3. Add Environment Variable:
   - `VITE_API_URL` = `https://disaster-backend-9xpr.onrender.com/api`
4. Click Deploy

### 2. Render (Backend) — already done ✅
- URL: https://disaster-backend-9xpr.onrender.com
- Add these Environment Variables in Render dashboard:
  - `DB_HOST` = your Aiven host
  - `DB_USER` = avnadmin
  - `DB_PASSWORD` = your Aiven password
  - `DB_NAME` = defaultdb
  - `DB_PORT` = 23006
  - `JWT_SECRET` = any random secret string

### 3. Aiven (MySQL) — already done ✅
