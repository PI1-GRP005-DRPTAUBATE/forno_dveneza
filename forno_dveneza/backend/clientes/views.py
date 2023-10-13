from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import Http404

from .models import Cliente
from .models import PasswordResetToken
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
        try:
            cliente = Cliente.objects.get(usuario=user)
            return cliente
        except Cliente.DoesNotExist:
            raise Http404("Cliente not found for this user.")
   
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

class PasswordResetView(APIView):
    def get(self, request):
        return render(request, 'clientes/reset_password.html')

    def post(self, request):
        email = request.POST['email']
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f"{settings.BASE_URL}/reset_password/{uid}/{token}/"
            send_mail(
                'Recuperação de Senha',
                f'Use o seguinte link para redefinir sua senha: {reset_link}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            messages.success(request, 'E-mail de redefinição de senha enviado com sucesso.')
        except User.DoesNotExist:
            messages.error(request, 'O e-mail informado está incorreto ou não está registrado.')
        return redirect('reset_password')

class PasswordResetConfirmView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                return render(request, 'myapp/reset_password_confirm.html', {'uidb64': uidb64, 'token': token})
            else:
                messages.error(request, 'Link de redefinição de senha inválido.')
                return redirect('reset_password')
        except User.DoesNotExist:
            messages.error(request, 'Link de redefinição de senha inválido.')
            return redirect('reset_password')

    def post(self, request, uidb64, token):
        password = request.POST['password']
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Senha redefinida com sucesso.')
            return redirect('login')
        else:
            messages.error(request, 'Link de redefinição de senha inválido.')
            return redirect('reset_password')

class ChangePasswordView(APIView):
    def get(self, request):
        form = PasswordChangeForm(user=request.user)
        return render(request, 'clientes/change_password.html', {'form': form})

    def post(self, request):
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, request.user)
            messages.success(request, 'Senha alterada com sucesso.')
            return redirect('change_password')
        else:
            messages.error(request, 'Houve um erro ao alterar a senha. Certifique-se de que a senha atual está correta e que a nova senha atende aos requisitos.')
            return redirect('change_password')