from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from ..serializers import UserSerializer, LoginSerializer


class CustomBasicAuthentication(BasicAuthentication):
    def authenticate_header(self, request):
        # Important see https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu?lq=1
        return None


class LoginView(APIView):
    authentication_classes = [CustomBasicAuthentication]

    def post(self, request: Request) -> Response:
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)   # DRF catches any validation error and sends a 400 response
        user = serializer.validated_data['user']
        django_login(request, user)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        django_logout(request)
        return Response({'detail': 'Logged out successfully!'}, status=status.HTTP_200_OK)


class MeView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response(UserSerializer(request.user).data)
