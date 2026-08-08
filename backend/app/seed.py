import random
from datetime import datetime, timedelta
from app.database import engine, SessionLocal, Base
from app.models import AdminUser, Service, Booking, GalleryItem, Review, ContactMessage, SiteSetting
from app.auth import get_password_hash


def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Admin User if not exists
    if not db.query(AdminUser).filter(AdminUser.username == "admin").first():
        admin = AdminUser(
            username="admin",
            email="admin@kbgarage.in",
            hashed_password=get_password_hash("admin123"),
        )
        db.add(admin)

    # Seed Services (INR Prices)
    if db.query(Service).count() == 0:
        services_data = [
            {
                "service_id": "general",
                "title": "General Maintenance & Inspection",
                "desc": "Comprehensive multi-point Indian road condition inspection, synthetic oil change, filter replacements & brake checks.",
                "price_inr": "₹2,499",
                "raw_price": 2499.0,
                "category": "maintenance",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
                "icon_name": "Wrench",
                "badge": "Essential",
            },
            {
                "service_id": "ceramic",
                "title": "9H Ceramic Coating & Paint Armor",
                "desc": "Ultra-hydrophobic 9H ceramic shield engineered for Indian weather, monsoon protection & intense UV dust resistance.",
                "price_inr": "₹14,999",
                "raw_price": 14999.0,
                "category": "detailing",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
                "icon_name": "Sparkles",
                "badge": "Popular",
            },
            {
                "service_id": "ppf",
                "title": "TPU Paint Protection Film (PPF)",
                "desc": "Self-healing TPU film covering high-impact front zones against gravel, scratches, and heavy highway debris.",
                "price_inr": "₹49,999",
                "raw_price": 49999.0,
                "category": "detailing",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
                "icon_name": "ShieldCheck",
                "badge": "Ultimate Armor",
            },
            {
                "service_id": "tuning",
                "title": "Stage 1 / 2 ECU Performance Tuning",
                "desc": "Dyno-tested custom remap for Indian fuel specs, optimizing torque response, fuel economy, and horsepower boost.",
                "price_inr": "₹19,999",
                "raw_price": 19999.0,
                "category": "performance",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
                "icon_name": "Zap",
                "badge": "High Performance",
            },
            {
                "service_id": "detailing",
                "title": "Deep Interior Steam & Leather Care",
                "desc": "Complete interior sanitization, AC duct steam cleaning, leather conditioning & stain removal.",
                "price_inr": "₹5,999",
                "raw_price": 5999.0,
                "category": "detailing",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
                "icon_name": "Sparkles",
                "badge": "Signature",
            },
        ]
        for s in services_data:
            db.add(Service(**s))

    # Seed Gallery Items (Indian Cars)
    if db.query(GalleryItem).count() == 0:
        gallery_data = [
            {
                "title": "9H Ceramic Coating on Tata Nexon EV",
                "car_model": "Tata Nexon EV (Dark Edition)",
                "category": "Ceramic Coating",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
                "desc": "Mirror-finish gloss and hydrophobicity applied to Tata Nexon EV.",
            },
            {
                "title": "Stage 1 ECU Tune & Offroad Setup on Mahindra Thar",
                "car_model": "Mahindra Thar 4x4 (Red Rage)",
                "category": "Performance Tuning",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
                "desc": "+35 BHP gain and instant low-end throttle response for trail riding.",
            },
            {
                "title": "Full TPU Paint Protection Film on Hyundai Creta",
                "car_model": "Hyundai Creta SX(O) 2024",
                "category": "PPF Armor",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
                "desc": "Complete self-healing paint protection film installation.",
            },
            {
                "title": "Deep Interior Steam & Ceramic Guard on Toyota Fortuner",
                "car_model": "Toyota Fortuner Legender",
                "category": "Detailing & Coating",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
                "desc": "High gloss ceramic shield and immaculate leather treatment.",
            },
            {
                "title": "Stage 2 Remap & Performance Exhaust on Volkswagen Virtus GT",
                "car_model": "Volkswagen Virtus 1.5 GT (India)",
                "category": "Performance Tuning",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png/1280px-2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png",
                "desc": "Enhanced acceleration, crackle tune, and upgraded intake system.",
            },
            {
                "title": "Custom Detailing & Maintenance on Maruti Suzuki Swift",
                "car_model": "Maruti Suzuki Swift ZXi+",
                "category": "General Maintenance",
                "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
                "desc": "Full synthetic engine overhaul, brake pad replacement, and polish.",
            },
        ]
        for g in gallery_data:
            db.add(GalleryItem(**g))

    # Seed Reviews (Indian Car Owners)
    if db.query(Review).count() == 0:
        reviews_data = [
            {
                "name": "Rajesh Sharma",
                "car": "Tata Safari Dark Edition",
                "text": "KB Garage treated my Safari with ultimate care. The 9H ceramic coating gives it an unbelievable shine even in monsoon dust!",
                "rating": 5,
                "is_featured": True,
            },
            {
                "name": "Ananya Verma",
                "car": "Mahindra XUV700 AX7L",
                "text": "Got the Stage 1 ECU remap done for my XUV700. Mid-range punch is insane now and throttle lag is completely gone!",
                "rating": 5,
                "is_featured": True,
            },
            {
                "name": "Rohan Kapoor",
                "car": "Hyundai Creta Turbo",
                "text": "Flawless PPF installation. Transparent INR pricing, top-tier facility in India, and technicians who treat your car like their own.",
                "rating": 5,
                "is_featured": True,
            },
            {
                "name": "Vikramaditya Singh",
                "car": "Toyota Fortuner 4x4",
                "text": "Quick turnaround for full fluid service and underbody rust protection. Best garage for Indian road conditions!",
                "rating": 5,
                "is_featured": True,
            },
        ]
        for r in reviews_data:
            db.add(Review(**r))

    # Seed Sample Bookings if empty
    if db.query(Booking).count() == 0:
        sample_bookings = [
            {
                "reference_id": "KB-849201",
                "make": "Tata",
                "model": "Nexon EV",
                "year": "2024",
                "service_id": "ceramic",
                "service_name": "9H Ceramic Coating & Paint Armor",
                "price_inr": "₹14,999",
                "date": "2026-08-12",
                "time_slot": "10:00 AM",
                "client_name": "Aarav Mehta",
                "client_email": "aarav.m@gmail.com",
                "client_phone": "+91 98765 12345",
                "notes": "Please focus on bonnet scratch correction.",
                "status": "Confirmed",
            },
            {
                "reference_id": "KB-392019",
                "make": "Mahindra",
                "model": "Thar 4x4",
                "year": "2023",
                "service_id": "tuning",
                "service_name": "Stage 1 / 2 ECU Performance Tuning",
                "price_inr": "₹19,999",
                "date": "2026-08-14",
                "time_slot": "01:30 PM",
                "client_name": "Priya Nair",
                "client_email": "priya.nair@outlook.com",
                "client_phone": "+91 98200 54321",
                "notes": "Desire better low-rpm torque for offroading.",
                "status": "Pending",
            },
        ]
        for b in sample_bookings:
            db.add(Booking(**b))

    db.commit()
    db.close()


if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully!")
