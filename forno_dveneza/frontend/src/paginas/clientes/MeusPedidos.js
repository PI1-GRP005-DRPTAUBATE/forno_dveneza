import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import React, { useState, useEffect } from "react";
import "./MeusPedidos.css";

const MeusPedidos = ({ pedido }) => {
  const [pedidos, setPedidos] = useState("");

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/pedidos/")
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter pedidos:", error);
      });
  }, []);

  const pedidosMock = [
    {
      numero: 1,
      itens: [
        { id: 1, nome: "Pizza Marguerita", quantidade: 2 },
        { id: 2, nome: "Bebida Refrigerante", quantidade: 1 },
      ],
      total: 30.0,
      data: "15/12/12",
    },
    {
      numero: 2,
      itens: [
        { id: 3, nome: "Pizza Calabresa", quantidade: 1 },
        { id: 4, nome: "Bebida Suco Natural", quantidade: 2 },
        { id: 4, nome: "Bebida Suco Natural", quantidade: 2 },
        { id: 4, nome: "Bebida Suco Natural", quantidade: 2 },
        { id: 4, nome: "Bebida Suco Natural", quantidade: 2 },
        { id: 4, nome: "Bebida Suco Natural", quantidade: 2 },
      ],
      total: 25.0,
      data: "12/12/12",
    },
  ];

  return (
    <div>
      <Header />
      <div style={{ marginTop: "10px", marginBottom: "100px" }}>
        {pedidos.length > 0 ? (
          <div className="centered-content">
            {pedidos.map((pedido) => (
              <div key={pedido.numero} className="pedido-container">
                <h4 className="pedido-header">
                  Número do Pedido: {pedido.numero}
                </h4>
                <p>Itens do Pedido</p>
                {pedido.itens.map((item) => (
                  <p key={item.id} className="pedido-item">
                    {item.nome} - Quantidade: {item.quantidade}
                  </p>
                ))}
                <p className="pedido-total">Total: R$ {pedido.total}</p>
              </div>
            ))}
          </div>
        ) : (
          // <div
          //   style={{ textAlign: "center", marginTop: "10px", padding: "80px" }}
          // >
          //   <h3>
          //     Você ainda não tem pedidos feitos, acesso cardápio e faça seu
          //     primeiro pedido com a gente!
          //   </h3>
          // </div>

          <div className="centered-content">
            {pedidosMock.map((pedido) => (
              <div key={pedido.numero} className="pedido-container">
                <h4 className="pedido-header">
                  Número do Pedido: {pedido.numero}
                </h4>
                <p>Itens do Pedido</p>
                {pedido.itens.map((item) => (
                  <p key={item.id} className="pedido-item">
                    {item.nome} - Quantidade: {item.quantidade}
                  </p>
                ))}
                <p className="pedido-item"> Data do pedido: {pedido.data}</p>
                <p className="pedido-total">Total: R$ {pedido.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default MeusPedidos;
