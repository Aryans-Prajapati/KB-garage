from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime
from datetime import datetime
from app.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    desc = Column(Text, nullable=False)
    price_inr = Column(String, nullable=False)  # e.g., "₹14,999"
    raw_price = Column(Float, nullable=False, default=0.0)  # Numeric value
    category = Column(String, nullable=False, default="general")
    image = Column(String, nullable=False)
    icon_name = Column(String, default="Wrench")
    badge = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    reference_id = Column(String, unique=True, index=True, nullable=False)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(String, nullable=False)
    service_id = Column(String, nullable=False)
    service_name = Column(String, nullable=False)
    price_inr = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time_slot = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    client_email = Column(String, nullable=False)
    client_phone = Column(String, nullable=False)
    notes = Column(Text, nullable=True)
    status = Column(String, default="Confirmed")  # Pending, Confirmed, Completed, Cancelled
    created_at = Column(DateTime, default=datetime.utcnow)


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    car_model = Column(String, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String, nullable=False)
    desc = Column(Text, nullable=True)


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    car = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    is_featured = Column(Boolean, default=True)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True, nullable=False)
    value = Column(Text, nullable=False)
