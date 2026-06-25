from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine
from models import Base, Contact
from schemas import ContactCreate


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins, you can change to ["http://localhost:5173"] for strict dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def home():

    return {
        "message": "API running"
    }


@app.post("/contact")
def create_contact(
    data: ContactCreate,
    db: Session = Depends(get_db)
):

    new_contact = Contact(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message
    )

    db.add(new_contact)

    db.commit()

    db.refresh(new_contact)

    return {
        "message": "Saved successfully",
        "id": new_contact.id
    }
