from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import ContactCreate
from models import Contact

router = APIRouter(
  prefix="/contacts",
  tags=["Contacts"]
)

@router.get("/{owner_id}")
def get_contacts(owner_id: int, db: Session = Depends(get_db)):

  contacts = db.query(Contact).filter(Contact.owner_id == owner_id).all()

  result = []
  for contact in contacts:
    result.append({
      "id": contact.id,
      "contact_name": contact.contact_name,
      "contact_number": contact.contact_number,
    })
  return {
    "successful": True,
    "contacts": result
  }

@router.post("")
def add_contact(contact: ContactCreate, db: Session = Depends(get_db)):
  
  already_contact = db.query(Contact).filter(Contact.owner_id == contact.owner_id, Contact.contact_number == contact.contact_number).first()

  if already_contact:
    return{
      "successful": False,
      "message": "Contact already exists"
    }

  new_contact = Contact(
    owner_id=contact.owner_id,
    contact_name=contact.contact_name,
    contact_number=contact.contact_number
  )

  db.add(new_contact)
  db.commit()
  db.refresh(new_contact)

  result = {
    "successful": True,
    "message": "Contact added successfully",
    "contact":{
      "id": new_contact.id,
      "contact_name": new_contact.contact_name,
      "contact_number": new_contact.contact_number
    }
  }
  return result