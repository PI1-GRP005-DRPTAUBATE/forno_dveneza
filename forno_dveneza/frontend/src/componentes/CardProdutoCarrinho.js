import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { extrairPublicId } from "../validacoes/extrairPublicId";
import "./CardProdutoCarrinho.css";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const url = produto.foto;
  const publicId = url ? extrairPublicId(url) : null;

  return (
    <div className="card-produto mb-4 justify-content-around">
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
      <div className="quantidade-produto" style={{ marginLeft: "22px" }}>
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
      {isMobile ? (
        <div className="card-text-preco" style={{ marginLeft: "-150px" }}>
          <p className="card-text-preco">Preço</p>
          <p className="card-text-preco">
            R$ {produto.preco_unidade * quantidade}
          </p>
        </div>
      ) : (
        <div>
          <p className="card-text">Preço</p>
          <p>R$ {produto.preco_unidade * quantidade}</p>
        </div>
      )}
      <div className="btn-carrinho">
        <Link
          className="link-button"
          onClick={() => {
            excluirProduto();
          }}
        >
          <p className="btn-carrinho-text">Excluir</p>
        </Link>
      </div>
    </div>
  );
};

export default CardProdutoCarrinho;
