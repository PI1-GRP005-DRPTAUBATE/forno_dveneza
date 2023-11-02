import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import React, { useState, useEffect } from "react";
import "./MeusPedidos.css";
import { useAuth } from "../../context/AuthContext";

const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { accessToken, csrfToken } = useAuth();
  const [categorias, setCategorias] = useState([]);

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/categorias/")
      .then((responseCategoria) => {
        setCategorias(responseCategoria.data);
      })
      .catch((error) => {
        console.error("Erro ao obter categorias:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/pedido/todos-pedidos/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": csrfToken,
      },
    })
      .then((response) => {
        console.log("RESPONSE PEDIDOS", response);
        setPedidos(response.data);
        console.log("itens response", response.data[0].itens_pedido);
        console.log("itens response", response.data[0].itens_pedido);
      })
      .catch((error) => {
        console.error("Erro ao obter pedidos:", error);
      });
  }, [accessToken, csrfToken]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/pedido/todos-pedidos/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": csrfToken,
      },
    })
      .then(async (response) => {
        const pedidosComProdutos = await Promise.all(
          response.data.map(async (pedido) => {
            const itensComNomes = await Promise.all(
              pedido.itens_pedido.map(async (item) => {
                try {
                  const responseProduto = await Axios.get(
                    `http://127.0.0.1:8000/api/produtos/${item.produto}/`
                  );
                  return {
                    ...item,
                    nomeProduto: responseProduto.data.nome,
                  };
                } catch (error) {
                  console.error("Erro ao obter informações do produto:", error);
                  return item;
                }
              })
            );

            return {
              ...pedido,
              itens_pedido: itensComNomes,
            };
          })
        );

        pedidosComProdutos.sort(
          (a, b) => new Date(b.data_compra) - new Date(a.data_compra)
        );

        setPedidos(pedidosComProdutos);
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
                {pedido.itens_pedido.length > 0 ? (
                  pedido.itens_pedido.map((item) => (
                    <div key={item.produto} className="pedido-item">
                      {categorias.find((cat) => cat.id === item.produto)
                        ?.descricao || "Categoria não encontrada"}{" "}
                      <p>
                        {" "}
                        {item.nomeProduto} - Quantidade: {item.quantidade}
                      </p>
                    </div>
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
                <p>Total: R$ {pedido.valor_total}</p>
                <p className="pedido-total">
                  Status do Pedido:{" "}
                  {pedido.status.charAt(0).toUpperCase() +
                    pedido.status.slice(1).replace(/_/g, " ")}
                </p>
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
