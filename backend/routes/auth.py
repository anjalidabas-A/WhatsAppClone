from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import UserLogin
from models import User

router = APIRouter(
  prefix="",
  tags=["Authentication"]
)

@router.post("/signin")
def signin(user: UserLogin, db: Session = Depends(get_db)):

  db_user = db.query(User).filter(User.phone_number == user.phone_number).first()

  if db_user:
    return {
      "successful": True,
      "message": "Valid User",
      "user": {
        "id": db_user.id,
        "name": db_user.name,
        "phone_number": db_user.phone_number,
      }
    }
  return{
    "successful": False,
    "message": "InValid User"
  }