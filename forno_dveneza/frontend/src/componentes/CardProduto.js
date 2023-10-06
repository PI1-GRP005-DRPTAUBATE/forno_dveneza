import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { extrairPublicId } from "../validacoes/extrairPublicId";

const CardProduto = ({
  produto,
  adicionarProdutoAoCarrinho,
  alertaCarrinho,
  categoria,
}) => {
  const [pizzaMeia, setPizzaMeia] = useState(false);
  const [borda, setBorda] = useState(false);

  const url = produto.foto;
  const publicId = url ? extrairPublicId(url) : null;

  console.log(url);
  console.log("publicId", publicId);
  return (
    <div className="card-produto mb-4 justify-content-around">
      <div className="card-img mx-2">
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
        <p className="card-text">
          <small>R$ {produto.preco_unidade}</small>
        </p>
        {categoria === "Pizza" && (
          <div>
            <label>
              Tipo de Pizza:
              <select
                value={pizzaMeia ? "Meia" : "Inteira"}
                onChange={(e) => setPizzaMeia(e.target.value === "Meia")}
                style={{ marginLeft: "10px", marginTop: "5px" }}
              >
                <option value="Inteira">Inteira</option>
                <option value="Meia">Meia</option>
              </select>
            </label>
            <label style={{ marginTop: "10px" }}>
              Borda:
              <select
                value={borda ? "Recheada" : "Simples"}
                onChange={(e) => setBorda(e.target.value === "Recheada")}
                style={{ marginLeft: "10px" }}
              >
                <option value="Recheada">Recheada</option>
                <option value="Simples">Simples</option>
              </select>
            </label>
          </div>
        )}
      </div>
      <div className="btn-cardapio">
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
