from datetime import timedelta

import pytest
from django.test import Client
from django.utils import timezone
from rest_framework.test import APIClient
from model_bakery import baker


@pytest.fixture
def user_password():
    return "super-secret"


@pytest.fixture
def user(django_user_model, user_password):
    return django_user_model.objects.create_user(
        username="testuser",
        password=user_password,
        first_name="Test",
        last_name="User",
        email="test@example.com",
    )


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def auth_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def csrf_client():
    return Client(enforce_csrf_checks=True)


@pytest.fixture
def subject_factory():
    def factory(**kwargs):
        return baker.make("core.Subject", **kwargs)

    return factory


@pytest.fixture
def session_factory(subject_factory):
    def factory(**kwargs):
        subject = kwargs.pop("subject", None) or subject_factory()
        if "startDate" not in kwargs:
            kwargs["startDate"] = timezone.now()
        if "endDate" not in kwargs:
            kwargs["endDate"] = kwargs["startDate"] + timedelta(minutes=10)
        return baker.make("core.Session", subject=subject, **kwargs)

    return factory
