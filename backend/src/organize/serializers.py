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
    lastWorked = serializers.CharField(allow_null=True) # ISO string
    