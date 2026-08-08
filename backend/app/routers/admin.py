from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import AdminUser, Booking, Service, Review, ContactMessage
from app.schemas import AdminLogin, Token, AdminUserOut, DashboardStats
from app.auth import verify_password, create_access_token, get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.post("/login", response_model=Token)
def login_admin(login_data: AdminLogin, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(
        (AdminUser.username == login_data.username) | (AdminUser.email == login_data.username)
    ).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=AdminUserOut)
def read_admin_me(current_admin: AdminUser = Depends(get_current_admin)):
    return current_admin


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    total_b = db.query(Booking).count()
    pending_b = db.query(Booking).filter(Booking.status == "Pending").count()
    confirmed_b = db.query(Booking).filter(Booking.status == "Confirmed").count()
    completed_b = db.query(Booking).filter(Booking.status == "Completed").count()
    total_s = db.query(Service).count()
    total_r = db.query(Review).count()
    unread_m = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()

    return DashboardStats(
        total_bookings=total_b,
        pending_bookings=pending_b,
        confirmed_bookings=confirmed_b,
        completed_bookings=completed_b,
        total_services=total_s,
        total_reviews=total_r,
        unread_messages=unread_m,
    )
