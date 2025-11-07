from datetime import datetime, timedelta

import pytest
from django.utils import timezone


@pytest.mark.django_db
def test_subject_session_count(subject_factory, session_factory):
    subject = subject_factory()
    session_factory(subject=subject)
    session_factory(subject=subject)

    assert subject.session_count == 2


@pytest.mark.django_db
def test_subject_latest_session_returns_most_recent(subject_factory, session_factory):
    subject = subject_factory()
    older = session_factory(
        subject=subject,
        startDate=timezone.now() - timedelta(hours=2),
        endDate=timezone.now() - timedelta(hours=1, minutes=30),
    )
    latest = session_factory(
        subject=subject,
        startDate=timezone.now() - timedelta(minutes=40),
        endDate=timezone.now() - timedelta(minutes=5),
    )

    assert subject.latest_session == latest
    assert subject.latest_session != older


@pytest.mark.django_db
def test_session_duration_and_minutes(session_factory):
    start = timezone.now() - timedelta(minutes=30)
    end = start + timedelta(minutes=25)
    session = session_factory(startDate=start, endDate=end)

    assert session.duration == timedelta(minutes=25)
    assert session.duration_mins == 25


@pytest.mark.django_db
def test_session_duration_returns_none_without_end(session_factory):
    session = session_factory(endDate=None)

    assert session.duration is None
    assert session.duration_mins is None


@pytest.mark.django_db
def test_session_duration_minutes_guard_against_negative(session_factory):
    start = timezone.now()
    end = start - timedelta(minutes=5)
    session = session_factory(startDate=start, endDate=end)

    assert session.duration_mins == 0


@pytest.mark.django_db
def test_session_admin_summary_includes_core_details(session_factory):
    fixed_start = timezone.make_aware(datetime(2024, 1, 1, 12, 0))
    session = session_factory(
        startDate=fixed_start,
        endDate=fixed_start + timedelta(minutes=30),
    )

    summary = session.admin_summary()

    assert "Start:" in summary
    assert "Duration:" in summary
    assert "Subject:" in summary
    assert session.subject_id in summary
    assert "30" in summary
