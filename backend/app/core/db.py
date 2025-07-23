from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

from app.core.config import settings

# Async database setup (main application)
async_engine = create_async_engine(
    settings.ASYNC_SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
    echo=False
)
AsyncSessionLocal = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Sync engine only for Alembic migrations
sync_engine = create_engine(settings.SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)

Base = declarative_base()

def create_tables():
    """Create all database tables - deprecated, use Alembic migrations"""
    Base.metadata.create_all(bind=sync_engine)

async def get_async_db():
    """Get async database session"""
    async with AsyncSessionLocal() as session:
        yield session
