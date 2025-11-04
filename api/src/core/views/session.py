from datetime import timedelta
from django.utils import timezone
from django.db import transaction
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..serializers import SessionSerializer
from ..models import Session, Subject
from .auth import CustomSessionAuthentication


MAX_SESSION_DURATION = timedelta(hours=3)
MIN_SESSION_DURATION = timedelta(minutes=3)


class SessionViewSet(ModelViewSet):
    """ For fetching and creating sessions
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]


class StartSessionView(APIView):
    """Create a new session with the current server time as startDate."""
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subject_name = request.data.get("subject")

        if not subject_name:
            return Response(
                {"detail": "Field 'subject' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Might need to update this when implementing subject management 
        subject, _ = Subject.objects.get_or_create(pk=subject_name)

        with transaction.atomic():
            active_session = (
                Session.objects.select_for_update()
                .filter(endDate__isnull=True)
                .order_by('-startDate', '-sessionId')
                .first()
            )

            if active_session is not None:
                return Response(
                    {"detail": "An active session already exists."},
                    status=status.HTTP_409_CONFLICT,
                )

            session = Session.objects.create(
                subject=subject,
                startDate=timezone.now(),
            )

        serializer = SessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ActiveSessionView(APIView):
    """Return details of the most recent session that is still running."""
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        with transaction.atomic():
            session = (
                Session.objects.select_for_update()
                .filter(endDate__isnull=True)
                .order_by('-startDate', '-sessionId')
                .first()
            )

            # Autoclose if active session exceeds max. duration limit
            if session and timezone.now() >= (session.startDate + MAX_SESSION_DURATION):
                session.endDate = session.startDate  + MAX_SESSION_DURATION
                session.save(update_fields=["endDate"])
                session = None

        if session is None:
            return Response(
                {"detail": "No active session found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = SessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class EndSessionView(APIView):
    """Close the most recent session that is still running."""
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        with transaction.atomic():
            session = (
                Session.objects.select_for_update()
                .filter(endDate__isnull=True)
                .order_by('-startDate', '-sessionId')
                .first()
            )

            if session is None:
                return Response(
                    {"detail": "No active session found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Adjust endDate if session has exceeded max. duration limit
            session.endDate = min(timezone.now(), session.startDate + MAX_SESSION_DURATION)

            # If a session of insufficient duration is ended, it will not be recorded
            if (session.endDate - session.startDate) < MIN_SESSION_DURATION:
                session.delete()
                return Response(
                    {"detail": "Session discarded due to insufficient duration."},
                    status=status.HTTP_202_ACCEPTED
                )
            
            session.save(update_fields=["endDate"])

        serializer = SessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)
    