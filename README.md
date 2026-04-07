# 🖥️ Portfolio — React + Node.js

A dark & sleek developer portfolio with a React frontend and Express backend.

---

## Project Structure

```
portfolio/
├── backend/          # Express API
│   ├── routes/
│   │   ├── contact.js    # POST /api/contact  (sends email)
│   │   └── projects.js   # GET  /api/projects
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/         # React + Vite
    ├── src/
    │   ├── components/   # Navbar, Hero, About, Skills, Projects, Education, Contact, Footer, Cursor
    │   ├── hooks/
    │   │   └── useReveal.js  # Intersection observer scroll reveal
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js    # Proxies /api → localhost:5000
    └── package.json
```

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your SMTP credentials

npm run dev       # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

> Vite proxies `/api/*` requests to `http://localhost:5000` automatically — no CORS issues in dev.

---

## 🔌 API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | /api/health      | Health check              |
| GET    | /api/projects    | List all projects         |
| GET    | /api/projects/:id| Single project            |
| POST   | /api/contact     | Send contact email        |

### POST /api/contact — Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hey, let's work together!"
}
```

---

## ✏️ Customization

### Change your info
Edit these files with your real data:
- `frontend/src/components/Hero.jsx` — name, tagline, stats
- `frontend/src/components/About.jsx` — bio, terminal widget
- `frontend/src/components/Skills.jsx` — skill cards
- `frontend/src/components/Education.jsx` — education items
- `frontend/src/components/Contact.jsx` — social links
- `backend/routes/projects.js` — projects array (or connect a real DB)

### Connect a real database
Replace the in-memory `projects` array in `backend/routes/projects.js` with your preferred DB:
- **PostgreSQL** → use `pg` or `prisma`
- **MongoDB** → use `mongoose`
- **Supabase** → use `@supabase/supabase-js`

### Email setup (Nodemailer)
In `.env`, set:
```
SMTP_HOST=smtp.gmail.com
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password   # Gmail: Settings → App Passwords
CONTACT_EMAIL=your@gmail.com
```

---

## 🏗️ Build for Production

```bash
# Frontend
cd frontend && npm run build    # outputs to frontend/dist/

# Backend — serve frontend/dist as static files, or deploy separately
# e.g. serve frontend on Vercel, backend on Railway/Render
```

---

## 🎨 Design Tokens (CSS Variables)

| Variable    | Value      | Usage               |
|-------------|------------|---------------------|
| `--bg`      | `#07080d`  | Page background     |
| `--bg2`     | `#0d0f17`  | Section alt bg      |
| `--bg3`     | `#12151f`  | Card / input bg     |
| `--cyan`    | `#00e5ff`  | Primary accent      |
| `--green`   | `#00ff9d`  | Success / badges    |
| `--text`    | `#c8d0e0`  | Body text           |
| `--text-dim`| `#5a6275`  | Muted text          |

Change `--cyan` in `frontend/src/index.css` to theme the entire site instantly.
