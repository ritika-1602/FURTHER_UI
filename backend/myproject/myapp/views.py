from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from django.core.files.storage import default_storage
from django.conf import settings

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        # If user is authenticated, send a success response
        try:
            role = user.userprofile.role
        except UserProfile.DoesNotExist:
            role = "Unknown"

        return Response({
            "message": "Login successful!",
            "role": role,
            "username": user.username
        }, status=status.HTTP_200_OK)

    else:
        return Response({"error": "Invalid credentials!"}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import viewsets
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
