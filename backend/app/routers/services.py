from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Service, AdminUser
from app.schemas import ServiceOut, ServiceCreate, ServiceUpdate
from app.auth import get_current_admin

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.get("", response_model=List[ServiceOut])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active == True).all()


@router.get("/all", response_model=List[ServiceOut])
def get_all_services_admin(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Service).all()


@router.post("", response_model=ServiceOut, status_code=status.HTTP_213_CREATED if hasattr(status, 'HTTP_213_CREATED') else 201)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_service = db.query(Service).filter(Service.service_id == service.service_id).first()
    if db_service:
        raise HTTPException(status_code=400, detail="Service ID already exists")
    new_service = Service(**service.dict())
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service


@router.put("/{service_id}", response_model=ServiceOut)
def update_service(service_id: int, service_update: ServiceUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = service_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_service, key, value)
    
    db.commit()
    db.refresh(db_service)
    return db_service


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}
