from pydantic import BaseModel

class UserLogin(BaseModel):
  phone_number: str
  password: str

class UserCreate(BaseModel):
  name: str
  phone_number: str
  password: str

class ContactCreate(BaseModel):
  owner_id: int
  contact_name: str
  contact_number: str

class ChatCreate(BaseModel):
  user1 : int
  user2 : int

class MessageCreate(BaseModel):
  chat_id: int
  sender_id: int
  text: str



