import random
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Booking, AdminUser
from app.schemas import BookingOut, BookingCreate, BookingUpdateStatus
from app.auth import get_current_admin

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.post("", response_model=BookingOut, status_code=201)
def create_booking(booking_in: BookingCreate, db: Session = Depends(get_db)):
    ref_id = f"KB-{random.randint(100000, 999999)}"
    db_booking = Booking(
        reference_id=ref_id,
        make=booking_in.make,
        model=booking_in.model,
        year=booking_in.year,
        service_id=booking_in.service_id,
        service_name=booking_in.service_name,
        price_inr=booking_in.price_inr,
        date=booking_in.date,
        time_slot=booking_in.time_slot,
        client_name=booking_in.client_name,
        client_email=booking_in.client_email,
        client_phone=booking_in.client_phone,
        notes=booking_in.notes or "",
        status="Confirmed",
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.get("", response_model=List[BookingOut])
def get_bookings(
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    query = db.query(Booking)
    if status_filter:
        query = query.filter(Booking.status == status_filter)
    return query.order_by(Booking.created_at.desc()).all()


@router.get("/{booking_id}", response_model=BookingOut)
def get_booking_by_id(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.patch("/{booking_id}/status", response_model=BookingOut)
def update_booking_status(
    booking_id: int,
    status_update: BookingUpdateStatus,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = status_update.status
    db.commit()
    db.refresh(booking)
    return booking


@router.delete("/{booking_id}")
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted successfully"}
