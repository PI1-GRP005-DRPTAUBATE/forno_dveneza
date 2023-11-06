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
    <div className="card-produto-carrinho justify-content-around rounded">
      <div className="card-img " style={{ maxWidth: "200px" }}>
        <Image
          cloudName="dfjghzyfb"
          publicId={publicId}
          alt={`Imagem ${produto.nome}`}
          className="cardapio-img"
          style={{ minWidth:"150px", minHeight:"150px" }}
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
        <p className="text-center">Quantidade</p>
        <button className="btn border" onClick={onDecrement}>-</button>
        <label for="quantidadeProdutoInput" style={{display: "none"}}>Quantidade do produto {produto.nome}</label>
        <input
          className="border border-0 mx-1"
          id="quantidadeProdutoInput"
          type="text"
          value={quantidade}
          style={{ width: "50px", textAlign: "center"}}
          readOnly
        />
        <button className="btn border" onClick={() => adicionarProdutoAoCarrinho(produto)}>+</button>
      </div>
      <div
        className="btn-carrinho"
        style={{ justifyContent: "center", marginTop: "45px" }}
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
