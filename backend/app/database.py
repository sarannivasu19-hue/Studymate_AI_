import os
import logging
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

logger = logging.getLogger("studymate.database")

DATABASE_URL = os.getenv("DATABASE_URL")
db_status_info = {"type": "unknown", "connected": False}


def build_engine():
    global db_status_info
    primary_url = None
    connect_args = {}

    if DATABASE_URL:
        raw = DATABASE_URL.strip()
        if raw.startswith("postgres://"):
            raw = raw.replace("postgres://", "postgresql+psycopg2://", 1)
        elif raw.startswith("postgresql://") and not raw.startswith("postgresql+"):
            raw = raw.replace("postgresql://", "postgresql+psycopg2://", 1)
        elif raw.startswith("mysql://"):
            raw = raw.replace("mysql://", "mysql+pymysql://", 1)
        primary_url = raw
        is_mysql = "mysql" in str(primary_url)
        db_ssl_val = os.getenv("DB_SSL", "").strip().lower()
        if db_ssl_val in ("true", "1") or (
            db_ssl_val == ""
            and "localhost" not in str(primary_url)
            and "127.0.0.1" not in str(primary_url)
        ):
            if is_mysql:
                connect_args = {"ssl": {}}
    else:
        db_user = os.getenv("DB_USER", "root")
        db_password = os.getenv("DB_PASSWORD", "")
        db_host = os.getenv("DB_HOST", "localhost")
        db_port = int(os.getenv("DB_PORT", "3306"))
        db_name = os.getenv("DB_NAME", "studymate")
        primary_url = URL.create(
            drivername="mysql+pymysql",
            username=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
            database=db_name,
            query={"charset": "utf8mb4"},
        )

    # Attempt connection to the primary database
    try:
        eng = create_engine(
            primary_url,
            pool_pre_ping=True,
            pool_recycle=300,
            connect_args=connect_args,
        )
        with eng.connect() as test_conn:
            test_conn.execute(text("SELECT 1"))
        db_status_info = {
            "type": "postgres" if "postgres" in str(primary_url) else "mysql",
            "connected": True,
        }
        return eng
    except Exception as exc:
        logger.warning(
            f"Primary database connection failed: {exc}. Falling back to SQLite for high availability."
        )
        db_status_info = {
            "type": "sqlite-fallback",
            "connected": True,
            "fallback_reason": str(exc).split("]")[-1].strip(),
        }
        sqlite_engine = create_engine(
            "sqlite:///./studymate.db",
            connect_args={"check_same_thread": False},
        )
        return sqlite_engine


engine = build_engine()
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()