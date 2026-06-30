from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import Base, User
 
from routes.contacts import router as contacts_router
from routes.chats import router as chats_router
from routes.messages import router as messages_router
from routes.auth import router as auth_router

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)

# user ---------------------------------
def add_users():
  db = SessionLocal()
  try:
    users = [
      {"name": "Anjali Dabas", "phone_number": "9876"},
      {"name": "Rachit Dabas", "phone_number": "1234"},
    ]

    for user in users:
      already_exists = db.query(User).filter(User.phone_number == user["phone_number"]).first()

      if not already_exists:
        new_user = User(
          name=user["name"],
          phone_number=user["phone_number"]
        )
        db.add(new_user)
  
    db.commit()
  finally:
    db.close()

add_users()

@app.get("/")
def home():
  return {"message": "Backend is running"}

# sigin ---------------------------------
app.include_router(auth_router)

# contacts---------------------------------------
app.include_router(contacts_router)

# chats --------------------------------------
app.include_router(chats_router)

# messages ---------------------------------------
app.include_router(messages_router)
