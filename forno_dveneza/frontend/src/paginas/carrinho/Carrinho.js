import React, { useState, useEffect } from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";

const Carrinho = () => {
  const [produtosCarrinho, setProdutosCarrinho] = useState(false);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <h2> Seu carrinho de compras</h2>
      </div>
      {produtosCarrinho ? (
        <div> </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "5px" }}>
          <p> Seu carrinho de compras esta vazio!</p>
          <Link to={"/cardapio"}>
            <p> Acesse o cardápio</p>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};
export default Carrinho;
