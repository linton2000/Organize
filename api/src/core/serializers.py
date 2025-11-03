from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Session, Subject


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class SummarySerializer(serializers.Serializer):
    lastWorked = serializers.DateTimeField() # Received as ISO string in frontend
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
