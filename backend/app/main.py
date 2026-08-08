from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.seed import seed_database
from app.routers import services, bookings, gallery, reviews, contact, admin

# Create tables and seed data automatically on startup
Base.metadata.create_all(bind=engine)
try:
    seed_database()
except Exception as e:
    print(f"Seed info: {e}")

app = FastAPI(
    title="KB Garage India API",
    description="Backend API for KB Garage automotive detailing, tuning & maintenance platform in India.",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(services.router)
app.include_router(bookings.router)
app.include_router(gallery.router)
app.include_router(reviews.router)
app.include_router(contact.router)
app.include_router(admin.router)


@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to KB Garage India Backend API",
        "docs": "/docs",
    }
