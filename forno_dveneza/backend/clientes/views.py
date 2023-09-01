from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Cliente
from .api.serializers import ClientesSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            token = {
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }
            return Response(token, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ClienteView(generics.RetrieveAPIView):
    serializer_class = ClientesSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        cliente = Cliente.objects.get(usuario=user)
        return cliente
        
class ClienteCreateView(generics.CreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClientesSerializer
    permission_classes = [IsAuthenticated]

class ClienteUpdateView(generics.UpdateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClientesSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class ClienteDeleteView(generics.DestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClientesSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
