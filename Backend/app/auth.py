from fastapi import HTTPException, Request
import firebase_admin
from firebase_admin import auth, credentials
from .config import settings

# Initialize Firebase Admin once
if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
    firebase_admin.initialize_app(cred)

def get_current_user(request: Request):
    """
    Extracts and verifies Firebase ID token from the Authorization header.
    Returns decoded token dict (contains uid, email, etc.).
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    token = auth_header.split("Bearer ", 1)[1].strip()
    try:
        decoded = auth.verify_id_token(token)
        # Basic sanity checks (issuer/audience are verified by SDK)
        if "uid" not in decoded:
            raise HTTPException(status_code=401, detail="Invalid token: uid missing")
        return decoded
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")
