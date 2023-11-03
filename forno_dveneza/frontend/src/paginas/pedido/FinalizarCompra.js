import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";

const FinalizarCompra = () => {
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [valorTroco, setValorTroco] = useState("");
  const { accessToken, csrfToken } = useAuth();
  const { produtosCarrinho, limparCarrinho, totalPedido } = useCarrinho();
  const navigate = useNavigate();

  const handleSubmitPedido = async (e) => {
    e.preventDefault();

    try {
      const dadosPedido = {
        itens_pedido: produtosCarrinho.map((item) => ({
          produto: item.produto.id,
          quantidade: item.quantidade,
        })),
        metodo_de_pagamento: formaDePagamento || "",
        valor_total: totalPedido,
        valor_troco: formaDePagamento === "dinheiro" ? valorTroco : null,
      };

      const response = await Axios.post(
        "http://127.0.0.1:8000/api/pedido/novo-pedido/",
        dadosPedido,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );

      limparCarrinho();
      setAlertaVisivel(true);
      setTimeout(() => {
        navigate("/pedidos");
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setAlertaVisivel(true);
    }
  };

  const renderFormadePagamento = () => {
    return (
      <div style={{ marginTop: "15px" }}>
        <label className="form-label">Forma de pagamento</label>
        <select
          className="form-select"
          value={formaDePagamento}
          onChange={(e) => setFormaDePagamento(e.target.value)}
        >
          <option value="">Selecione a forma de pagamento</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h2>Informações de entrega do seu pedido</h2>
      </div>
      <div
        className="form-container"
        style={{ width: "400px", margin: "30px auto 0" }}
      >
        <form>
          {renderFormadePagamento()}
          <div style={{ marginTop: "15px" }}>
            <label className="form-label">Valor do Troco</label>
            <input
              type="text"
              className="form-control"
              placeholder="Valor do Troco"
              value={valorTroco}
              onChange={(e) => setValorTroco(e.target.value)}
              disabled={formaDePagamento !== "dinheiro"}
            />
          </div>

          <div className="btn-container-carrinho" style={{ marginTop: "30px" }}>
            <button
              type="submit"
              className="btn-carrinho-checkout"
              style={{ boxShadow: "none" }}
              onClick={handleSubmitPedido}
            >
              <p> Confirmar pedido </p>
            </button>
            <Link to={"/cardapio"} className="btn-carrinho-checkout">
              <p> Cancelar</p>
            </Link>
          </div>
        </form>
      </div>
      {alertaVisivel && (
        <div className="overlay">
          <div className="alert-container">
            <div
              id="alertaProduto"
              className="alert alert-success w-50 text-center alert-dismissible fade show"
              role="alert"
            >
              Pedido feito com sucesso!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertaVisivel(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FinalizarCompra;
