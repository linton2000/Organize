from rest_framework.viewsets import ModelViewSet
from serializers import *
from models import *


class SessionViewSet(ModelViewSet):
    """
    A simple ViewSet for fetching and creating sessions
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
