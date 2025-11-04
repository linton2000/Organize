from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from ..serializers import UserSerializer


class CustomBasicAuthentication(BasicAuthentication):
    def authenticate_header(self, request):
        # This prevents Django from sending a login popup to the browser on invalid creds
        # See https://stackoverflow.com/questions/9859627/how-to-prevent-browser-to-invoke-basic-auth-popup-and-handle-401-error-using-jqu?lq=1
        return None


class CustomSessionAuthentication(SessionAuthentication):
    def authenticate_header(self, request):
        # Adding this WWW-Authenticate header makes DRF send a 401 instead of a 403 (needed for frontend comms)
        return 'Turn this into a 401 please'


class LoginView(APIView):
    authentication_classes = [CustomBasicAuthentication]

    def post(self, request: Request) -> Response:
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({'detail': 'Username & password are required'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request=request, username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid username/password combination'},
                            status=status.HTTP_401_UNAUTHORIZED)

        django_login(request, user)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        django_logout(request)
        return Response({'detail': 'Logged out successfully!'}, status=status.HTTP_200_OK)


class MeView(APIView):
    authentication_classes = [CustomSessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response(UserSerializer(request.user).data)
