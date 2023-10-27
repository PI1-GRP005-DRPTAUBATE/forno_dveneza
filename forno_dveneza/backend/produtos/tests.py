from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Produto, Categoria, Borda
from .api.serializers import ProdutosSerializer, CategoriasSerializer, BordaSerializer

class ProdutoApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.categoria = Categoria.objects.create(descricao='Pizza')
        self.produto = Produto.objects.create(
            nome='Pizza teste',
            descricao='Descrição da pizza teste',
            foto='https://res.cloudinary.com/dfjghzyfb/image/upload/v1/images/pizza-calabresa_xui7tf',
            preco_unidade='52.0',
            id_categoria=self.categoria
        )
    
    def test_listar_produtos(self):
        response = self.client.get('/api/produtos/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        produtos = Produto.objects.all()
        serializer = ProdutosSerializer(produtos, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_detalhes_produto(self):
        response = self.client.get('/api/produtos/{}/'.format(self.produto.id))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = ProdutosSerializer(self.produto)
        self.assertEqual(response.data, serializer.data)
