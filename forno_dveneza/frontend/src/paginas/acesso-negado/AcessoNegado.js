import React from "react";
import { Link } from "react-router-dom";

const estiloContainer = {
  textAlign: "center",
  margin: "20px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
};

const estiloTitulo = {
  fontSize: "24px",
  color: "#fa7f72",
};

const estiloMensagem = {
  fontSize: "18px",
  color: "#333",
  margin: "10px 0",
};

const estiloLink = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  textDecoration: "none",
  borderRadius: "5px",
};

const estiloLinkHover = {
  backgroundColor: "#0056b3",
};

const AcessoNegado = () => {
  return (
    <div>
      <p>Você precisa estar logado para acessar esta área.</p>
      <p>Faça login para poder acessar!</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default AcessoNegado;
