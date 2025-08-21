from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routes import users, tasks

app = FastAPI(title="Todo Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://to-do-list-roan-two-38.vercel.app",
        "https://to-do-list-g0mlbq8md-ansh21000-2097s-projects.vercel.app",
        # optionally: add your localhost for testing
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables (simple dev approach; use migrations later)
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Backend working 🚀"}

# Routers
app.include_router(users.router)
app.include_router(tasks.router)
