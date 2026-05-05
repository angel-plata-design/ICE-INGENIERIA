from fastapi import FastAPI, APIRouter, HTTPException, Request, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="ICE Ingeniería API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============================================================
# Models
# ============================================================
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class QuotationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    company: Optional[str] = Field(None, max_length=160)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    service_type: Optional[str] = Field(None, max_length=120)
    message: str = Field(..., min_length=5, max_length=4000)

    @field_validator('name', 'company', 'phone', 'service_type', 'message', mode='before')
    @classmethod
    def trim_strings(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v


class Quotation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    service_type: Optional[str] = None
    message: str
    status: str = "new"
    ip: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuotationPublic(BaseModel):
    id: str
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    service_type: Optional[str] = None
    message: str
    status: str
    created_at: datetime


# ============================================================
# Utilities
# ============================================================
def _get_client_ip(request: Request) -> Optional[str]:
    fwd = request.headers.get('x-forwarded-for')
    if fwd:
        return fwd.split(',')[0].strip()
    if request.client:
        return request.client.host
    return None


def _doc_to_public(doc: dict) -> QuotationPublic:
    # Mongo's _id is not used; we rely on `id` field.
    return QuotationPublic(
        id=doc['id'],
        name=doc['name'],
        company=doc.get('company'),
        email=doc['email'],
        phone=doc.get('phone'),
        service_type=doc.get('service_type'),
        message=doc['message'],
        status=doc.get('status', 'new'),
        created_at=doc['created_at'],
    )


# ============================================================
# Routes
# ============================================================
@api_router.get("/")
async def root():
    return {"service": "ICE Ingeniería API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/quotations", response_model=QuotationPublic, status_code=201)
async def create_quotation(payload: QuotationCreate, request: Request):
    quotation = Quotation(
        **payload.model_dump(),
        ip=_get_client_ip(request),
    )
    doc = quotation.model_dump()
    # Ensure datetime is stored as datetime (Motor handles this)
    await db.quotations.insert_one(doc)
    logger.info(f"New quotation received: id={quotation.id} email={quotation.email}")
    return _doc_to_public(doc)


@api_router.get("/quotations", response_model=List[QuotationPublic])
async def list_quotations(limit: int = Query(50, ge=1, le=500)):
    cursor = db.quotations.find().sort("created_at", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return [_doc_to_public(d) for d in docs]


@api_router.get("/quotations/{quotation_id}", response_model=QuotationPublic)
async def get_quotation(quotation_id: str):
    doc = await db.quotations.find_one({"id": quotation_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Quotation not found")
    return _doc_to_public(doc)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
