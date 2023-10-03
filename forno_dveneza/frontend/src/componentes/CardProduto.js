import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardProduto = ({
  produto,
  adicionarProdutoAoCarrinho,
  alertaCarrinho,
  categoria,
}) => {
  const [pizzaMeia, setPizzaMeia] = useState(false);
  const [borda, setBorda] = useState(false);

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
        {categoria === "Pizza" && (
          <div>
            <label style={{ marginLeft: "0px" }}>
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
