import React from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { extrairPublicId } from "../validacoes/extrairPublicId";

const CardProdutoCarrinho = ({
  produto,
  quantidade,
  onIncrement,
  onDecrement,
  adicionarProdutoAoCarrinho,
  alertaCarrinho,
  excluirProduto,
  item,
  borda,
  pizzaMeia,
}) => {
  const url = produto.foto;
  const publicId = url ? extrairPublicId(url) : null;

  return (
    <div className="card-produto-carrinho justify-content-around">
      <div className="card-img " style={{ maxWidth: "100px" }}>
        <Image
          cloudName="dfjghzyfb"
          publicId={publicId}
          alt={`Imagem ${produto.nome}`}
          className="cardapio-img"
        />
      </div>

      <div className="card-info mx-2">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>

        {produto.categoria === "Pizza" && (
          <p>Tipo: {pizzaMeia ? "Meia" : "Inteira"}</p>
        )}
        {produto.categoria === "Pizza" && (
          <p>Borda: {borda ? "Rechada" : "Simples"}</p>
        )}
      </div>
      <div className="quantidade-produto">
        <p>Quantidade</p>
        <button onClick={onDecrement}>-</button>
        <input
          type="text"
          value={quantidade}
          style={{ width: "50px" }}
          readOnly
        />
        <button onClick={() => adicionarProdutoAoCarrinho(produto)}>+</button>
      </div>
      <div
        className="btn-carrinho"
        style={{ justifyContent: "center", marginTop: "35px" }}
      >
        <Link
          className="link-button"
          onClick={() => {
            excluirProduto();
          }}
        >
          <p className="btn-carrinho-text">Excluir</p>
        </Link>
      </div>
      <div>
        <p className="card-text">Preço</p>
        <p>R$ {produto.preco_unidade * quantidade}</p>
      </div>
    </div>
  );
};

export default CardProdutoCarrinho;
