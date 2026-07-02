from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import ChatCreate
from models import Chat

router = APIRouter(
  prefix="/chats",
  tags=["Chats"]
)

@router.post("")
def create_chat(chat: ChatCreate, db: Session = Depends(get_db)):

  existing_chat = db.query(Chat).filter(
    ((Chat.user1 == chat.user1)&(Chat.user2 == chat.user2))| 
    ((Chat.user1 == chat.user2)&(Chat.user2 == chat.user1))
    ).first()
  
  if existing_chat:
    return{
      "successful": True,
      "message": "Chat already exists",
      "chat_id": existing_chat.id
    }
  
  new_chat = Chat(
    user1=chat.user1,
    user2=chat.user2
  )
  db.add(new_chat)
  db.commit()
  db.refresh(new_chat)

  return{
    "successful": True,
    "message": "Chat created successfully"
  }