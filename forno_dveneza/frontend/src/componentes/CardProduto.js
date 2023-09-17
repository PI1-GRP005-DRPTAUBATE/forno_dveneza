import React from "react";
import { Link } from "react-router-dom";

const CardProduto = ({
  produto,
  adicionarProdutoAoCarrinho,
  alertaCarrinho,
}) => {
  return (
    <div className="card-produto mb-4 justify-content-around">
      <div className="card-img mx-2" style={{ maxWidth: "100px" }}>
        <img
          src={produto.foto.url}
          className="cardapio-img"
          alt={`Imagem ${produto.nome}`}
        />
      </div>
      <div className="card-info mx-2">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
        <p className="card-text">
          <small>R$ {produto.preco_unidade}</small>
        </p>
      </div>
      <div className="btn-cardapio" style={{ justifyContent: "center" }}>
        <Link
          className="link-button"
          onClick={() => {
            adicionarProdutoAoCarrinho(produto);
            alertaCarrinho();
          }}
        >
          <p className="btn-cardapio-text">Adicionar ao carrinho</p>
        </Link>
      </div>
    </div>
  );
};

export default CardProduto;
