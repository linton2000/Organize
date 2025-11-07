import os


_ENV_DEFAULTS = {
    "SECRET_KEY": "test-secret-key",
    "ALLOWED_HOSTS": "localhost,testserver",
    "DJANGO_DEBUG": "true",
    "SECURE_SSL_REDIRECT": "false",
    "SECURE_HSTS_SECONDS": "0",
    "SECURE_HSTS_INCLUDE_SUBDOMAINS": "false",
    "SECURE_HSTS_PRELOAD": "false",
    "FRONTEND_ORIGINS": "http://localhost",
    "DB_NAME": "test_db",
    "DB_USER": "test_user",
    "DB_PASSWORD": "test_password",
    "DB_HOST": "localhost",
    "DB_PORT": "5432",
    "DB_CONN_MAX_AGE": "0",
}

for key, value in _ENV_DEFAULTS.items():
    os.environ.setdefault(key, value)

from .settings import *  # noqa: F401,F403


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "test_db.sqlite3",
    }
}

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
CSRF_ALLOWED_ORIGINS = []
CSRF_TRUSTED_ORIGINS = []
CORS_ALLOWED_ORIGINS = []
