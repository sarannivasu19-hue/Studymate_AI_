# StudyMateAI

An AI-powered study platform: tutor chat, PDF summarization, quiz/flashcard
generation, multilingual support, voice I/O, exam success prediction, a
global learning exchange, and AR/VR modules — built in phases so the project
is always in a working state.

## Phase 1 — Authentication + MySQL ✅ (this delivery)

Stack:
- **Backend:** FastAPI + SQLAlchemy + MySQL (via PyMySQL), JWT auth, bcrypt password hashing
- **Frontend:** React + Vite, React Router, custom CSS (no UI framework dependency yet)

### Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env with your real MySQL credentials and a random JWT_SECRET_KEY

# Make sure MySQL is running and the database exists:
#   mysql -u root -p < schema.sql
# (or just start the app — it auto-creates the `users` table on startup)

uvicorn app.main:app --reload --port 8000
```

API docs will be at `http://localhost:8000/docs`.

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. The Vite dev server proxies `/api/*` to the
FastAPI backend on port 8000 (see `vite.config.js`), so no CORS headaches
in local dev.

### What's implemented

- `POST /api/auth/signup` — create account, returns JWT + user
- `POST /api/auth/login` — OAuth2 password flow, returns JWT + user
- `GET /api/auth/me` — fetch current user from a Bearer token
- React pages: `/login`, `/signup`, `/dashboard` (protected route)
- Passwords hashed with bcrypt; tokens signed with HS256 JWT
- `schema.sql` included for your ER diagram / project report

## Roadmap (build order)

1. ✅ User authentication (login/signup) + MySQL
2. ⬜ Responsive UI with dashboard and navigation
3. ⬜ Gemini-powered AI Tutor and chat
4. ⬜ PDF upload, summarization, and PDF generation
5. ⬜ Quiz generation, flashcards, and multilingual support
6. ⬜ Voice input/output and Memory Booster AI
7. ⬜ Exam Success Predictor (ML model on sample educational data)
8. ⬜ Global Learning Exchange with chat and translation
9. ⬜ AR and VR learning modules
10. ⬜ Testing, optimization, and deployment (Vercel + Render)

Documentation (SRS, ER diagram, UML, project report, PPT, viva questions)
will be produced alongside the build, once the feature set is locked in —
trying to write them before the schema/APIs stabilize just means rewriting
them later.

## Notes for next phase

Phase 2 will add: a persistent nav shell (sidebar + topbar), a real
dashboard layout, and wire the Gemini API key from `.env` into a first
backend endpoint (`/api/tutor/chat`) so Phase 3 has a clean base to extend.
