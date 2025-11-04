from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..serializers import SubjectSerializer, SummarySerializer
from ..models import Session, Subject
from .auth import CustomSessionAuthentication


class SubjectViewSet(ModelViewSet):
    """ For fetching and creating subjects
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]


class SummaryView(APIView):
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """ Return last worked date as an ISO 8601 datetime string
        """
        last = Session.objects.filter(endDate__isnull=False) \
                              .order_by('-endDate').first()
        lw = None
        if last and last.endDate:
            lw = last.endDate

        serializer = SummarySerializer({ "lastWorked": lw})
        return Response(serializer.data, status=status.HTTP_200_OK)
