#!/bin/bash
set -e

echo "🐳 Starting Docker entrypoint..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
python -c "
import time
import sys
from app.core.db import sync_engine
from sqlalchemy import text

max_tries = 30
for i in range(max_tries):
    try:
        with sync_engine.connect() as conn:
            conn.execute(text('SELECT 1'))
        print('✅ Database is ready!')
        break
    except Exception as e:
        if i == max_tries - 1:
            print(f'❌ Database connection failed after {max_tries} attempts: {e}')
            sys.exit(1)
        print(f'⏳ Database not ready, waiting... ({i+1}/{max_tries})')
        time.sleep(2)
"

# Run migrations
echo "🔄 Running migrations..."
alembic upgrade head

# Start the application
echo "🚀 Starting FastAPI application..."
exec "$@"
