from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import GalleryItem, AdminUser
from app.schemas import GalleryItemOut, GalleryItemCreate
from app.auth import get_current_admin

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])


@router.get("", response_model=List[GalleryItemOut])
def get_gallery_items(db: Session = Depends(get_db)):
    return db.query(GalleryItem).all()


@router.post("", response_model=GalleryItemOut, status_code=201)
def create_gallery_item(
    item: GalleryItemCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    new_item = GalleryItem(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.delete("/{item_id}")
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return {"message": "Gallery item deleted"}
