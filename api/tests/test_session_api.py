from datetime import timedelta

import pytest
from django.urls import reverse
from django.utils import timezone

from core.models import Session, Subject
from core.views.session import MAX_SESSION_DURATION, MIN_SESSION_DURATION


@pytest.mark.django_db
def test_start_session_requires_subject_field(auth_client):
    url = reverse("start-session")

    response = auth_client.post(url, {}, format="json")

    assert response.status_code == 400
    assert response.data["detail"] == "Field 'subject' is required."


@pytest.mark.django_db
def test_start_session_creates_subject_if_missing(auth_client):
    url = reverse("start-session")

    response = auth_client.post(url, {"subject": "Deep Work"}, format="json")

    assert response.status_code == 201
    assert response.data["subject"] == "Deep Work"
    assert Subject.objects.filter(pk="Deep Work").exists()


@pytest.mark.django_db
def test_start_session_returns_conflict_when_active_session_exists(auth_client, session_factory):
    session_factory(endDate=None)
    url = reverse("start-session")

    response = auth_client.post(url, {"subject": "Focus"}, format="json")

    assert response.status_code == 409
    assert response.data["detail"] == "An active session already exists."


@pytest.mark.django_db
def test_active_session_returns_latest_active_session(auth_client, session_factory):
    inactive = session_factory()
    active = session_factory(endDate=None, startDate=timezone.now() - timedelta(minutes=5))
    url = reverse("active-session")

    response = auth_client.get(url)

    assert response.status_code == 200
    assert response.data["sessionId"] == active.sessionId
    assert response.data["sessionId"] != inactive.sessionId


@pytest.mark.django_db
def test_active_session_returns_404_when_none(auth_client):
    url = reverse("active-session")

    response = auth_client.get(url)

    assert response.status_code == 404
    assert response.data["detail"] == "No active session found."


@pytest.mark.django_db
def test_active_session_auto_closes_when_duration_exceeded(auth_client, session_factory):
    start = timezone.now() - MAX_SESSION_DURATION - timedelta(minutes=1)
    session = session_factory(startDate=start, endDate=None)
    url = reverse("active-session")

    response = auth_client.get(url)
    session.refresh_from_db()

    assert response.status_code == 404
    assert response.data["detail"] == "No active session found."
    assert session.endDate == session.startDate + MAX_SESSION_DURATION


@pytest.mark.django_db
def test_end_session_returns_404_when_no_active_session(auth_client):
    url = reverse("end-session")

    response = auth_client.post(url)

    assert response.status_code == 404
    assert response.data["detail"] == "No active session found."


@pytest.mark.django_db
def test_end_session_discards_short_sessions(auth_client, session_factory):
    start = timezone.now() - (MIN_SESSION_DURATION - timedelta(minutes=1))
    session = session_factory(startDate=start, endDate=None)
    url = reverse("end-session")

    response = auth_client.post(url)

    assert response.status_code == 202
    assert response.data["detail"] == "Session discarded due to insufficient duration."
    assert not Session.objects.filter(pk=session.sessionId).exists()


@pytest.mark.django_db
def test_end_session_caps_duration_to_maximum(auth_client, session_factory):
    start = timezone.now() - (MAX_SESSION_DURATION + timedelta(minutes=10))
    session = session_factory(startDate=start, endDate=None)
    url = reverse("end-session")

    response = auth_client.post(url)
    session.refresh_from_db()

    assert response.status_code == 200
    assert response.data["sessionId"] == session.sessionId
    assert session.endDate == session.startDate + MAX_SESSION_DURATION


@pytest.mark.django_db
def test_end_session_returns_serialized_session(auth_client, session_factory):
    start = timezone.now() - timedelta(minutes=30)
    session = session_factory(startDate=start, endDate=None)
    url = reverse("end-session")

    response = auth_client.post(url)

    assert response.status_code == 200
    assert response.data["sessionId"] == session.sessionId
    assert response.data["subject"] == session.subject_id
