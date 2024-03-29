from django.shortcuts import render
from django.http import HttpRequest

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Session
from .serializers import *
from .summary import computeSummary

# Create your views here.
@api_view(['GET', 'POST'])
def sessions(request: HttpRequest):
    if request.method == 'GET':
        data = Session.objects.all()
        serializer = SessionSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def summary(request: HttpRequest):
	return Response(computeSummary())

