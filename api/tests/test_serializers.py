import pytest
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from core.serializers import SummarySerializer, UserSerializer


def test_summary_serializer_handles_none():
    serializer = SummarySerializer({"lastWorked": None})

    assert serializer.data["lastWorked"] is None


def test_summary_serializer_renders_datetime_isoformat():
    moment = timezone.now()
    serializer = SummarySerializer({"lastWorked": moment})

    parsed = parse_datetime(serializer.data["lastWorked"])
    assert parsed == moment


@pytest.mark.django_db
def test_user_serializer_returns_expected_fields(user):
    data = UserSerializer(user).data

    assert data == {
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
    }
