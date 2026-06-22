from pydantic import BaseModel

class UserLogin(BaseModel):
  number: str

class MessageCreate(BaseModel):
  chat_name: str
  text: str
  message_type: str