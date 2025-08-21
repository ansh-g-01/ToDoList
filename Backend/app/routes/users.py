from fastapi import APIRouter, Depends, Request
from ..auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me")
def read_me(user = Depends(get_current_user)):
    # Return minimal profile from token
    return {
        "uid": user.get("uid"),
        "email": user.get("email"),
        "name": user.get("name"),
        "picture": user.get("picture"),
        "email_verified": user.get("email_verified"),
    }
