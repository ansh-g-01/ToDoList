from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from ..database import get_db
from ..auth import get_current_user
from ..models.task import Task
from ..schemas.task import TaskCreate, TaskUpdate, TaskOut

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskOut])
def list_tasks(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    uid = user["uid"]
    tasks = (
        db.query(Task)
        .filter(Task.user_id == uid)
        .order_by(Task.date.asc(), Task.id.asc())
        .all()
    )
    return tasks

@router.post("/", response_model=TaskOut, status_code=201)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    uid = user["uid"]
    task = Task(user_id=uid, text=payload.text, date=payload.date, completed=False)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    uid = user["uid"]
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == uid).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if payload.text is not None:
        task.text = payload.text
    if payload.date is not None:
        task.date = payload.date
    if payload.completed is not None:
        task.completed = payload.completed

    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=204)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    uid = user["uid"]
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == uid).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return
