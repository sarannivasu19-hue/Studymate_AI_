import os
import logging
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

logger = logging.getLogger("studymate.database")

Base = declarative_base()


def get_engine():
    # 1. Check for standard DATABASE_URL (common in cloud hosts like Render)
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        # Convert postgres:// to postgresql:// for SQLAlchemy
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)
        try:
            eng = create_engine(database_url, pool_pre_ping=True)
            with eng.connect():
                logger.info("Connected to database via DATABASE_URL")
                return eng
        except Exception as e:
            logger.warning(f"Failed to connect using DATABASE_URL: {e}")

    # 2. Try MySQL connection from individual DB_* environment variables
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = int(os.getenv("DB_PORT", "3306"))
    db_name = os.getenv("DB_NAME", "studymate")

    if db_user and db_name:
        url = URL.create(
            drivername="mysql+pymysql",
            username=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
            database=db_name,
            query={"charset": "utf8mb4"},
        )
        # Attempt connection first with SSL, then without SSL if needed
        for ssl_opts in [{}, None]:
            try:
                connect_args = {"ssl": ssl_opts} if ssl_opts is not None else {}
                eng = create_engine(
                    url,
                    pool_pre_ping=True,
                    connect_args=connect_args,
                )
                with eng.connect():
                    logger.info("Successfully connected to MySQL database: %s", db_name)
                    return eng
            except Exception as e:
                logger.warning(f"MySQL connection attempt failed (ssl={ssl_opts}): {e}")

    # 3. Graceful fallback to SQLite (guarantees the backend never fails to start!)
    sqlite_url = "sqlite:///./studymate.db"
    logger.warning("Falling back to local SQLite database: %s", sqlite_url)
    eng = create_engine(
        sqlite_url,
        connect_args={"check_same_thread": False},
        pool_pre_ping=True,
    )
    return eng


engine = get_engine()
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()