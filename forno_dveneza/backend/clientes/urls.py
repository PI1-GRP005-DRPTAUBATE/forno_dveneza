from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import ClienteCreateView, ClienteUpdateView, ClienteDeleteView, ClienteView, PasswordResetView, PasswordResetConfirmView, ChangePasswordView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('novo-cliente/', ClienteCreateView.as_view(), name='novo_cliente'),
    path('editar-cliente/<int:id>/', ClienteUpdateView.as_view(), name='atualizar_cliente'),
    path('deletar-cliente/<int:id>/', ClienteDeleteView.as_view(), name='deletar_cliente'),
    path('informacoes/', ClienteView.as_view(), name='informacoes'),
    path('reset_password/', PasswordResetView.as_view(), name='reset_password'),
    path('reset_password/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),

]