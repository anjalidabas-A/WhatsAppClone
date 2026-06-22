from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  number = Column(String, unique=True, index=True)

class Message(Base):
  __tablename__ = "messages"

  id = Column(Integer, primary_key=True, index=True)
  chat_name = Column(String, index=True)
  text = Column(String)
  message_type = Column(String)