from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"]
)

mobile_data = ["9876" , "1234"]

class User(BaseModel):
  number: str

@app.post("/signin")
def signin(user: User):
  if user.number in mobile_data:
    return {
      "successful": True,
      "message": "Valid User"
    }
  return{
      "successful": False,
      "message": "InValid User"
  }