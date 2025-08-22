from rest_framework.viewsets import ModelViewSet
from .serializers import SessionSerializer, SubjectSerializer
from .models import Session, Subject


class SessionViewSet(ModelViewSet):
    """ A simple ViewSet for fetching and creating sessions
    """
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class SubjectViewSet(ModelViewSet):
    """ A simple ViewSet for fetching and creating subjects
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    