from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String, nullable=False)
  phone_number = Column(String, unique=True, index=True)

class Contact(Base):
  __tablename__ = "contacts"

  id = Column(Integer, primary_key=True, index=True)
  owner_id = Column(Integer, ForeignKey("users.id"))
  contact_name = Column(String, nullable=False)
  contact_number = Column(String, nullable=False)

class Chat(Base):
  __tablename__ = "chats"

  id = Column(Integer, primary_key=True, index=True)
  user1 = Column(Integer, ForeignKey("users.id"))
  user2= Column(Integer, ForeignKey("users.id"))  

class Message(Base):
  __tablename__ = "messages"

  id = Column(Integer, primary_key=True, index=True)
  chat_id = Column(Integer, ForeignKey("chats.id"))
  sender_id = Column(Integer, ForeignKey("users.id"))
  text = Column(String, nullable=False)

