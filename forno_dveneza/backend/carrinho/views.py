from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Carrinho, ItemCarrinho
from produtos.models import Produto
from clientes.models import Cliente

from .api.serializers import ItemCarrinhoSerializer

class AdicionarProdutoCarrinho(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado"})
        
        carrinho = Carrinho.objects.get(cliente=cliente)
        
        produto_id = request.data.get('produto_id')
        quantidade = request.data.get('quantidade')

        try:
            produto = Produto.objects.get(pk=produto_id)
        except Produto.DoesNotExist:
            return Response({"Erro": "Produto não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        item_carrinho, created = ItemCarrinho.objects.get_or_create(produto=produto, quantidade=quantidade)
        carrinho.itens.add(item_carrinho)

        return Response({"Mensagem": "Produto adicionado ao carrinho com sucesso"})
    
class ExcluirProdutoCarrinho(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado"})
        
        carrinho = Carrinho.objects.get(cliente=cliente)
        item_id = request.data.get('item_id')

        try:
            item_carrinho = carrinho.itens.get(id=item_id)
        except ItemCarrinho.DoesNotExist:
            return Response({'Erro:', 'Item do carrinho não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        item_carrinho.delete()
        return Response({"Mensagem": "Item removido do carrinho com sucesso."}, status=status.HTTP_204_NO_CONTENT)
    
class ProdutoCarrinho(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemCarrinhoSerializer

    def get_object(self):
        try:
            cliente = Cliente.objects.get(usuario=self.request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        item_id = self.request.data.get('item_id')
        
        carrinho = Carrinho.objects.get(cliente=cliente)
        item_carrinho = carrinho.itens.get(id=item_id)

        return item_carrinho
        
class ListaProdutosCarrinho(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        carrinho = Carrinho.objects.get(cliente=cliente)
        itens_carrinho = carrinho.itens.all()
        produtos_carrinho = []

        for item in itens_carrinho:
            produto_info = {
                'item_id': item.id,
                'produto_id': item.produto.id,
                'nome': item.produto.nome,
                'descricao': item.produto.descricao,
                'url_imagem': item.produto.foto.url,
                'quantidade': item.quantidade,
                'preco_unidade': item.produto.preco_unidade,
            }
            produtos_carrinho.append(produto_info)

        return Response(produtos_carrinho, status=status.HTTP_200_OK)
    
class AlterarQuantidadeProduto(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado"})
        
        carrinho = Carrinho.objects.get(cliente=cliente)
        item_id = request.data.get('item_id')
        nova_quantidade = request.data.get('quantidade')

        try:
            item_carrinho = carrinho.itens.get(id=item_id)
        except ItemCarrinho.DoesNotExist:
            return Response({"Erro": "Item do carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        item_carrinho.quantidade = nova_quantidade
        item_carrinho.save()

        return Response({"Mensagem": "Quantidade de produto alterada com sucesso."}, status=status.HTTP_204_NO_CONTENT)
