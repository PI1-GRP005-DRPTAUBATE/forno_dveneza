import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import React, { useState, useEffect } from "react";
import "./MeusPedidos.css";
import { useAuth } from "../../context/AuthContext";

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { accessToken, csrfToken } = useAuth();

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/pedido/todos-pedidos/", {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": csrfToken,
      },
    })
      .then((response) => {
        console.log("RESPONSE PEDIDOS", response);
        setPedidos(response.data);
        console.log("response.data.get", response.data.get("itens", []));
      })
      .catch((error) => {
        console.error("Erro ao obter pedidos:", error);
      });
  }, [accessToken, csrfToken]);

  return (
    <div>
      <Header />
      <div style={{ marginTop: "10px", marginBottom: "100px" }}>
        {pedidos ? (
          <div className="centered-content">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-container">
                <h4 className="pedido-header">Número do Pedido: {pedido.id}</h4>
                <p>Itens do Pedido</p>
                {pedido.itens ? (
                  pedido.itens.map((item) => (
                    <p key={item.id} className="pedido-item">
                      {item.nome} - Quantidade: {item.quantidade}
                    </p>
                  ))
                ) : (
                  <p className="pedido-item">Sem itens</p>
                )}
                <p className="data">
                  Data do pedido: {formatarData(pedido.data_compra)}
                </p>
                <p className="data">
                  Método de pagamento: {pedido.metodo_de_pagamento}
                </p>
                <p className="pedido-total">Total: R$ {pedido.valor_total}</p>
                <p>Status do Pedido: {pedido.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{ textAlign: "center", marginTop: "10px", padding: "80px" }}
          >
            <h3>
              Você ainda não tem pedidos feitos. Acesse o cardápio e faça seu
              primeiro pedido com a gente!
            </h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default MeusPedidos;
