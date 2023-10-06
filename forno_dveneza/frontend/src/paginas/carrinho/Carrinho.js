import React from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import CardProdutoCarrinho from "../../componentes/CardProdutoCarrinho";
import "./Carrinho.css";

const Carrinho = ({ pizzaMeia, borda }) => {
  const {
    produtosCarrinho,
    excluirProduto,
    adicionarProdutoAoCarrinho,
    setProdutosCarrinho,
  } = useCarrinho();

  const calcularTotal = (produtosCarrinho) => {
    let total = 0;

    produtosCarrinho.forEach((item) => {
      total += item.produto.preco_unidade * item.quantidade;
    });

    return total;
  };
  const decrementQuantity = (produtoId) => {
    const novoCarrinho = [...produtosCarrinho];
    const index = novoCarrinho.findIndex(
      (item) => item.produto.id === produtoId
    );

    if (index !== -1) {
      if (novoCarrinho[index].quantidade > 1) {
        novoCarrinho[index].quantidade -= 1;
        setProdutosCarrinho(novoCarrinho);
      } else {
        excluirProduto(produtoId);
      }
    }
  };

  const agruparProdutos = () => {
    const produtosUnicos = [];

    produtosCarrinho.forEach((item) => {
      const index = produtosUnicos.findIndex(
        (produto) => produto.produto.id === item.produto.id
      );

      if (index !== -1) {
        produtosUnicos[index].quantidade += item.quantidade;
      } else {
        produtosUnicos.push({ ...item });
      }
    });

    return produtosUnicos;
  };

  const produtosUnicos = agruparProdutos();
  const totalCompra = calcularTotal(produtosUnicos);
  return (
    <div className="centered-content" style={{ marginBottom: "200px" }}>
      <Header />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Seu carrinho de compras</h2>
      </div>
      {produtosUnicos.length ? (
        <div>
          <div className="centered-content">
            {produtosUnicos.map((item) => (
              <CardProdutoCarrinho
                key={item.produto.id}
                produto={item.produto}
                quantidade={item.quantidade}
                onDecrement={() => decrementQuantity(item.produto.id)}
                borda={item.borda}
                pizzaMeia={item.pizzaMeia}
                adicionarProdutoAoCarrinho={() =>
                  adicionarProdutoAoCarrinho(
                    item.produto,
                    item.pizzaMeia,
                    item.borda
                  )
                }
                excluirProduto={() => excluirProduto(item.produto.id)}
              />
            ))}
          </div>
          <div className="checkout-carrinho">
            <p>Preço total: R$ {totalCompra.toFixed(2)}</p>
            <div className="btn-container-carrinho">
              <Link to={"/cardapio"} className="btn-carrinho-checkout">
                <p>Continue comprando</p>
              </Link>
              <Link to={"/finalizar-compra"} className="btn-carrinho-checkout">
                <p>Finalizar compra</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <p>Seu carrinho de compras está vazio!</p>
          <Link to={"/cardapio"}>
            <p>Acesse o cardápio</p>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Carrinho;
