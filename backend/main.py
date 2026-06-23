from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import Base, User, Message, Contact
from schemas import UserLogin, MessageCreate, ContactCreate

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)

def add_users():
  db = SessionLocal()

  user1 = db.query(User).filter(User.number == "9876").first()

  if not user1:
    db.add(User(number="9876"))
  
  db.commit()
  db.close()

add_users()

@app.get("/")
def home():
  return {"message": "Backend is running"}

@app.post("/signin")
def signin(user: UserLogin):
  db = SessionLocal()

  db_user = db.query(User).filter(User.number == user.number).first()

  db.close()

  if db_user:
    return {
      "successful": True,
      "message": "Valid User"
    }
  return{
      "successful": False,
      "message": "InValid User"
  }

@app.post("/message")
def save_message(message: MessageCreate):
  db = SessionLocal()

  new_message = Message(
    chat_name=message.chat_name,
    text=message.text,
    message_type=message.message_type,
  )

  db.add(new_message)
  db.commit()

  received_message = Message(
    chat_name=message.chat_name,
    text="OKAY",
    message_type="received",
  )

  db.add(received_message)
  db.commit()
  
  db.close()

  return{
    "successful": True,
    "message": "Message Saved",
  }

@app.get("/messages/{chat_name}")
def get_messages(chat_name: str):
  db = SessionLocal()

  all_messages = db.query(Message).filter(Message.chat_name == chat_name).all()

  db.close()

  result = []

  for msg in all_messages:
    result.append({
      "id": msg.id,
      "chat_name": msg.chat_name,
      "text": msg.text,
      "message_type": msg.message_type,
    })

  return{
    "successful": True,
    "messages": result
  }

@app.get("/contacts")
def get_contacts():
  db = SessionLocal()

  contacts = db.query(Contact).all()

  result = []
  for contact in contacts:
    result.append({
      "id": contact.id,
      "name": contact.name
    })
  db.close()
  return result

@app.post("/contacts")
def add_contact(contact: ContactCreate):
  db = SessionLocal()

  already_contact = db.query(Contact).filter(Contact.name == contact.name).first()

  if already_contact:
    db.close()
    return{
      "successful": False,
      "message": "Contact already exists"
    }

  new_contact = Contact(name=contact.name)

  db.add(new_contact)
  db.commit()
  db.refresh(new_contact)

  result = {
    "successful": True,
    "message": "Contact added successfully",
    "contact":{
      "id": new_contact.id,
      "name": new_contact.name,
    }
  }
  db.close()
  return result