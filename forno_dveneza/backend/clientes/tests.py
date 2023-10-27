from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Cliente

class ClienteAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = get_user_model().objects.create_user(
            username='testuser1',
            password='testpass1'
        )
        self.user2 = get_user_model().objects.create_user(
            username='testuser2',
            password='testpass2'
        )
        self.cliente = Cliente.objects.create(
            usuario=self.user1,
            nome='Guido',
            sobrenome='van Rossum',
            sexo='M',
            data_nascimento='1956-01-31',
            cpf='644.036.730-74',
            cep='123456-78',
            endereco='123 Main St',
            bairro='Downtown',
            cidade='Cityville',
            estado='SP',
            celular='(19) 12345-6790'
        )
        self.valid_login_data = {'username': 'testuser1', 'password': 'testpass1'}
        self.invalid_login_data = {'username': 'testuser', 'password': 'wrongpass'}

    def test_cliente_retrieve(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get('/api/usuario/informacoes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], self.cliente.nome)

    def test_cliente_create(self):
        self.client.force_authenticate(user=self.user2)
        data = {
            'nome': 'Ada',
            'sobrenome': 'Lovelace',
            'sexo': 'F',
            'data_nascimento': '1995-02-15',
            'cpf': '962.879.850-20',
            'cep': '87654-321',
            'endereco': '456 Elm St',
            'bairro': 'Uptown',
            'cidade': 'Townville',
            'estado': 'SP',
            'celular': '(24) 98765-3210',
            'usuario': self.user2.id
        }
        response = self.client.post('/api/usuario/novo-cliente/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cliente.objects.filter(nome='Ada').count(), 1)

    def test_cliente_update(self):
        self.client.force_authenticate(user=self.user2)
        data = {
            'nome': 'Updated Name',
            'sobrenome': 'Lovelace',
            'sexo': 'F',
            'data_nascimento': '1995-02-15',
            'cpf': '962.879.850-20',
            'cep': '87654-321',
            'endereco': '456 Elm St',
            'bairro': 'Uptown',
            'cidade': 'Townville',
            'estado': 'SP',
            'celular': '(24) 98765-3210',
            'usuario': self.user2.id
        }
        response = self.client.put(f'/api/usuario/editar-cliente/{self.cliente.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.cliente.refresh_from_db()
        self.assertEqual(self.cliente.nome, 'Updated Name')

    def test_cliente_login_valid(self):
        response = self.client.post('/api/usuario/token/', self.valid_login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cliente_login_invalid(self):
        response = self.client.post('/api/usuario/token/', self.invalid_login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)