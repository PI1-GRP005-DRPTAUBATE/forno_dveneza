import React from "react";
import { Link } from "react-router-dom";

const CardProdutoCarrinho = ({
  produto,
  quantidade,
  onIncrement,
  onDecrement,
  adicionarProdutoAoCarrinho,
  alertaCarrinho,
  excluirProduto,
  item,
}) => {
  return (
    <div className="card-produto mb-4 justify-content-around">
      <div className="card-img mx-2" style={{ maxWidth: "100px" }}>
        {produto.foto && produto.foto.url ? (
          <img
            src={produto.foto.url}
            className="cardapio-img"
            alt={`Imagem ${produto.nome}`}
          />
        ) : (
          <p>Imagem não disponível</p>
        )}
      </div>

      <div className="card-info mx-2">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
      </div>
      <div className="quantidade-produto">
        <button onClick={onDecrement}>-</button>
        <input type="text" value={quantidade} readOnly />
        <button onClick={() => adicionarProdutoAoCarrinho(produto)}>+</button>
      </div>
      <div className="btn-cardapio" style={{ justifyContent: "center" }}>
        <Link
          className="link-button"
          onClick={() => {
            excluirProduto();
          }}
        >
          <p className="btn-cardapio-text">Excluir produto</p>
        </Link>
      </div>
      <p className="card-text">
        <small>R$ {produto.preco_unidade * quantidade}</small>
      </p>
    </div>
  );
};

export default CardProdutoCarrinho;
