#!/usr/bin/env bash
set -euo pipefail

cd /app/src

python manage.py collectstatic --noinput
python manage.py migrate

exec gunicorn django_proj.wsgi:application --bind 0.0.0.0:8000
