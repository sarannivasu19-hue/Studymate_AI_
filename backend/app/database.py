import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

# ---------------------------------------------------------------------------
# Build the database URL
# ---------------------------------------------------------------------------
# Priority: DATABASE_URL env var (used on Render / cloud providers)
#           → individual DB_* vars (used for local development)
# Supports both PostgreSQL (Render native) and MySQL
# ---------------------------------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Render PostgreSQL provides postgres:// or postgresql://
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
    elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)
    elif DATABASE_URL.startswith("mysql://"):
        DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
    url = DATABASE_URL
else:
    url = URL.create(
        drivername="mysql+pymysql",
        username=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        database=os.getenv("DB_NAME", "studymate"),
        query={"charset": "utf8mb4"},
    )

# ---------------------------------------------------------------------------
# SSL: explicitly configurable via DB_SSL.
# For MySQL: connect_args = {"ssl": {}}
# For PostgreSQL: Render handles SSL in the connection string automatically
# ---------------------------------------------------------------------------

is_mysql = "mysql" in str(url)

db_ssl_val = os.getenv("DB_SSL", "").strip().lower()
if db_ssl_val == "false" or db_ssl_val == "0":
    _use_ssl = False
elif db_ssl_val == "true" or db_ssl_val == "1":
    _use_ssl = True
else:
    _use_ssl = bool(
        DATABASE_URL
        and "localhost" not in str(DATABASE_URL)
        and "127.0.0.1" not in str(DATABASE_URL)
    )

connect_args = {"ssl": {}} if (_use_ssl and is_mysql) else {}

engine = create_engine(
    url,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()