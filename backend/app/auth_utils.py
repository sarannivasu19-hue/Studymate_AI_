import os
from datetime import datetime, timedelta
from jose import jwt, JWTError
import bcrypt
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()

# bcrypt hard-limits input to 72 bytes of UTF-8.
# Silently truncating would make different passwords equivalent — a security
# bug.  We reject over-long passwords explicitly with a clear user message.
BCRYPT_MAX_BYTES = 72

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


def _validate_password_byte_length(password: str) -> None:
    """Raise HTTP 422 if the password's UTF-8 encoding exceeds bcrypt's 72-byte limit."""
    byte_length = len(password.encode("utf-8"))
    if byte_length > BCRYPT_MAX_BYTES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                f"Password is too long ({byte_length} bytes). "
                f"Passwords must be at most {BCRYPT_MAX_BYTES} bytes when encoded as UTF-8. "
                "Please use a shorter password."
            ),
        )


def hash_password(password: str) -> str:
    _validate_password_byte_length(password)
    pwd_bytes = password.encode("utf-8")[:BCRYPT_MAX_BYTES]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        pwd_bytes = plain_password.encode("utf-8")[:BCRYPT_MAX_BYTES]
        hashed_bytes = hashed_password.encode("utf-8")
        return bcrypt.checkpw(pwd_bytes, hashed_bytes)
    except Exception:
        return False


def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except JWTError:
        return None
