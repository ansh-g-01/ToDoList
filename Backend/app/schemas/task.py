from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class TaskCreate(BaseModel):
    text: str
    date: date

class TaskUpdate(BaseModel):
    text: Optional[str] = None
    date: Optional[date] = None
    completed: Optional[bool] = None

class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    text: str
    date: date
    completed: bool
    created_at: Optional[datetime] = None
