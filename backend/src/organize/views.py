from rest_framework.viewsets import ModelViewSet
from .serializers import SessionSerializer
from .models import Session


class SessionViewSet(ModelViewSet):
    """
    A simple ViewSet for fetching and creating sessions
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
