from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

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

        data = {"last_worked": ts}
        return Response(SummarySerializer(data).data)
    