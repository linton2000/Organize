from datetime import timedelta

import pytest
from django.urls import reverse
from django.utils import timezone
from django.utils.dateparse import parse_datetime


@pytest.mark.django_db
def test_subject_list_requires_authentication(api_client):
    url = reverse("subject-list")

    response = api_client.get(url)

    assert response.status_code == 401
    assert response.data["detail"] == "Authentication credentials were not provided."


@pytest.mark.django_db
def test_subject_crud_flow(auth_client):
    url = reverse("subject-list")

    create_response = auth_client.post(url, {"name": "Focus Block"}, format="json")
    assert create_response.status_code == 201
    assert create_response.data["name"] == "Focus Block"
    assert create_response.data["isActive"] is True

    list_response = auth_client.get(url)
    assert list_response.status_code == 200
    assert len(list_response.data) == 1
    assert list_response.data[0]["name"] == "Focus Block"


@pytest.mark.django_db
def test_summary_view_returns_none_when_no_sessions(auth_client):
    url = reverse("summary")

    response = auth_client.get(url)

    assert response.status_code == 200
    assert response.data == {"lastWorked": None}


@pytest.mark.django_db
def test_summary_view_returns_last_worked_datetime(auth_client, session_factory):
    earlier = session_factory(endDate=timezone.now() - timedelta(hours=1))
    latest = session_factory(endDate=timezone.now() - timedelta(minutes=5))

    url = reverse("summary")
    response = auth_client.get(url)

    assert response.status_code == 200
    parsed = parse_datetime(response.data["lastWorked"])
    assert parsed == latest.endDate
    assert parsed != earlier.endDate
