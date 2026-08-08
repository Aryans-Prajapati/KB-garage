from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Review, AdminUser
from app.schemas import ReviewOut, ReviewCreate
from app.auth import get_current_admin

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


@router.get("", response_model=List[ReviewOut])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.is_featured == True).all()


@router.get("/all", response_model=List[ReviewOut])
def get_all_reviews(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Review).all()


@router.post("", response_model=ReviewOut, status_code=201)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
):
    new_review = Review(**review.dict())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review


@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}
