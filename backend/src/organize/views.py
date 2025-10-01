from django.utils import timezone
from django.db import transaction
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import SessionSerializer, SubjectSerializer, SummarySerializer
from .models import Session, Subject


class SessionViewSet(ModelViewSet):
    """ For fetching and creating sessions
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SubjectViewSet(ModelViewSet):
    """ For fetching and creating subjects
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SummaryView(APIView):
    def get(self, request):
        """ Return last worked date as Unix time interval (seconds since epoch)
        """
        last = Session.objects.order_by('-endDate').first()
        ts = None
        if last and last.endDate:
            dt = last.endDate
            if timezone.is_naive(dt):
                dt = timezone.make_aware(dt)
            ts = int(dt.timestamp())

        data = {"lastWorked": ts}
        return Response(SummarySerializer(data).data)


class EndSessionView(APIView):
    """Close the most recent session that is still running."""

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

            session.endDate = timezone.now()
            session.save(update_fields=["endDate"])

        serializer = SessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
