from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import UserCreate
from models import User

router = APIRouter(
  prefix="/signup",
  tags=["Signup"]
)

@router.post("")
def signup(user: UserCreate, db: Session = Depends(get_db)):

  existing_user = db.query(User).filter(User.phone_number == user.phone_number).first()

  if existing_user:
    return {
      "successful": False,
      "message": "Phone number already registered"
    }
  
  new_user = User(
    name=user.name,
    phone_number=user.phone_number,
    password=user.password
  )

  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return{
    "successful": True,
    "message": "Account created successfully",
    "user": {
      "id": new_user.id,
      "name": new_user.name,
      "phone_number": new_user.phone_number
    }
  }