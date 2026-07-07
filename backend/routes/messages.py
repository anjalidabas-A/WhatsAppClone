from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import MessageCreate
from models import Message

router = APIRouter(
  prefix="/messages",
  tags=["Messages"]
)

@router.post("")
def save_message(message: MessageCreate, db: Session = Depends(get_db)):

  new_message = Message(
    chat_id=message.chat_id,
    sender_id=message.sender_id,
    text=message.text,
  )

  db.add(new_message)
  db.commit()
  db.refresh(new_message)

  return{
    "successful": True,
    "message": "Message Sent successfully",
  }

@router.get("/{chat_id}")
def get_messages(chat_id: int, user_id: int, db: Session = Depends(get_db)):

  all_messages = db.query(Message).filter(Message.chat_id == chat_id).all()

  result = []

  for msg in all_messages:

    if msg.sender_id == user_id and msg.deleted_by_sender:
      continue

    if msg.sender_id != user_id and msg.deleted_by_receiver:
      continue

    result.append({
      "id": msg.id,
      "chat_id": msg.chat_id,
      "sender_id": msg.sender_id,
      "text": msg.text,
    })

  return{
    "successful": True,
    "messages": result
  }

@router.delete("/{message_id}")
def delete_message(message_id: int, user_id: int, db: Session  = Depends(get_db)):

  message = db.query(Message).filter(Message.id == message_id).first()

  if not message:
    return {
      "successful": False,
      "message": "Message not found"
    }
  
  if message.sender_id == user_id:
    message.deleted_by_sender = True
  else:
    message.deleted_by_receiver = True

  if message.deleted_by_sender and message.deleted_by_receiver:
    db.delete(message)
  
  db.commit()

  return {
    "successful": True,
    "message": "Message deleted successfully"
  }