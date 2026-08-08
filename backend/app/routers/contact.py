from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import ContactMessage, AdminUser
from app.schemas import ContactMessageOut, ContactMessageCreate
from app.auth import get_current_admin

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactMessageOut, status_code=201)
def submit_contact_form(msg: ContactMessageCreate, db: Session = Depends(get_db)):
    new_msg = ContactMessage(**msg.dict())
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return new_msg


@router.get("", response_model=List[ContactMessageOut])
def get_contact_messages(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.patch("/{msg_id}/read", response_model=ContactMessageOut)
def mark_message_as_read(
    msg_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin),
):
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    db.refresh(msg)
    return msg
