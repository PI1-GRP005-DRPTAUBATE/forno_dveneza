import React, { createContext, useContext, useEffect, useState } from "react";

const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
  const carrinhoInicial = JSON.parse(localStorage.getItem("carrinho")) || [];

  const [produtosCarrinho, setProdutosCarrinho] = useState(carrinhoInicial);
  const [formaDePagamentoCarrinho, setFormaDePagamento] = useState("");
  const [totalPedido, setTotalPedido] = useState("");

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(produtosCarrinho));
  }, [produtosCarrinho]);

  const adicionarProdutoAoCarrinho = (produto, pizzaMeia, borda) => {
    const carrinhoAtualizado = [...produtosCarrinho];
    const index = carrinhoAtualizado.findIndex(
      (item) => item.produto.id === produto.id
    );

    if (index !== -1) {
      carrinhoAtualizado[index].quantidade += 1;
    } else {
      carrinhoAtualizado.push({
        produto,
        quantidade: 1,
        pizzaMeia,
        borda,
      });
    }
    setProdutosCarrinho(carrinhoAtualizado);
  };

  const excluirProduto = (produtoId) => {
    const novoCarrinho = produtosCarrinho.filter(
      (item) => item.produto.id !== produtoId
    );
    setProdutosCarrinho(novoCarrinho);
  };

  const pagamento = (pagamento) => {
    setFormaDePagamento(pagamento);
  };

  const limparCarrinho = () => {
    setProdutosCarrinho([]);
    setFormaDePagamento("");
  };

  return (
    <CarrinhoContext.Provider
      value={{
        produtosCarrinho,
        setProdutosCarrinho,
        adicionarProdutoAoCarrinho,
        excluirProduto,
        pagamento,
        formaDePagamentoCarrinho,
        setFormaDePagamento,
        limparCarrinho,
        setTotalPedido,
        totalPedido,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
