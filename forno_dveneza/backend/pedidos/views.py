from clientes.models import Cliente
from pedidos.models import Pedido, ItemPedido
from pedidos.api.serializers import PedidosSerializer, ItemPedidoSerializer

from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
    
class CriarPedidoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado!"}, status=status.HTTP_404_NOT_FOUND)
        
        itens = request.data.get('itens', [])
        item_pedido_serializer = ItemPedidoSerializer(data=itens, many=True)

        if item_pedido_serializer.is_valid():
            pedido = Pedido(
                cliente=cliente,
                cep=cliente.cep,
                endereco=cliente.endereco,
                complemento=cliente.complemento,
                referencia=cliente.referencia,
                bairro=cliente.bairro,
                cidade=cliente.cidade,
                metodo_de_pagamento=request.data.get('metodo_de_pagamento', ''),
                troco=request.data.get('troco', 0),
            )
            pedido.save()

            for item_data in item_pedido_serializer.validated_data:
                item_pedido = ItemPedido.objects.create(
                    pedido=pedido,
                    produto=item_data['produto'],
                    quantidade=item_data['quantidade']
                )

            return Response(status=status.HTTP_201_CREATED)
        else:
            print(item_pedido_serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class ListarPedidosView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Pedido.objects.all()
    serializer_class = PedidosSerializer

    def get_queryset(self):
        try:
            cliente = Cliente.objects.get(usuario=self.request.user)
        except Cliente.DoesNotExist:
            return Response({"Erro": "Cliente não encontrado!"}, status=status.HTTP_404_NOT_FOUND)
        
        return Pedido.objects.filter(cliente=cliente)
        