from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class AdminLogin(BaseModel):
    username: str
    password: str


class AdminUserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


# Service Schemas
class ServiceBase(BaseModel):
    service_id: str
    title: str
    desc: str
    price_inr: str
    raw_price: float
    category: str
    image: str
    icon_name: Optional[str] = "Wrench"
    badge: Optional[str] = None
    is_active: bool = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    desc: Optional[str] = None
    price_inr: Optional[str] = None
    raw_price: Optional[float] = None
    category: Optional[str] = None
    image: Optional[str] = None
    icon_name: Optional[str] = None
    badge: Optional[str] = None
    is_active: Optional[bool] = None


class ServiceOut(ServiceBase):
    id: int

    class Config:
        from_attributes = True


# Booking Schemas
class BookingCreate(BaseModel):
    make: str
    model: str
    year: str
    service_id: str
    service_name: str
    price_inr: str
    date: str
    time_slot: str
    client_name: str
    client_email: str
    client_phone: str
    notes: Optional[str] = ""


class BookingUpdateStatus(BaseModel):
    status: str


class BookingOut(BaseModel):
    id: int
    reference_id: str
    make: str
    model: str
    year: str
    service_id: str
    service_name: str
    price_inr: str
    date: str
    time_slot: str
    client_name: str
    client_email: str
    client_phone: str
    notes: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Gallery Schemas
class GalleryItemBase(BaseModel):
    title: str
    car_model: str
    category: str
    image: str
    desc: Optional[str] = None


class GalleryItemCreate(GalleryItemBase):
    pass


class GalleryItemOut(GalleryItemBase):
    id: int

    class Config:
        from_attributes = True


# Review Schemas
class ReviewBase(BaseModel):
    name: str
    car: str
    text: str
    rating: int = 5
    is_featured: bool = True


class ReviewCreate(ReviewBase):
    pass


class ReviewOut(ReviewBase):
    id: int

    class Config:
        from_attributes = True


# Contact Message Schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


class ContactMessageOut(ContactMessageCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Dashboard Stats Schema
class DashboardStats(BaseModel):
    total_bookings: int
    pending_bookings: int
    confirmed_bookings: int
    completed_bookings: int
    total_services: int
    total_reviews: int
    unread_messages: int
