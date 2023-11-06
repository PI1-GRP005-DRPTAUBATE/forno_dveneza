import React from "react";
import { Link } from "react-router-dom";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";

const estiloContainer = {
  textAlign: "center",
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #fa7f72",
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  width: "300px",
};

const estiloTitulo = {
  fontSize: "24px",
  color: "#fa7f72",
  marginBottom: "10px",
};

const estiloMensagem = {
  fontSize: "18px",
  color: "#333",
  marginBottom: "20px",
};

const estiloLink = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  textDecoration: "none",
  borderRadius: "5px",
};

const AcessoNegado = () => {
  return (
    <>
      <Header />
      <div style={estiloContainer}>
        <p style={estiloTitulo}>Acesso Negado</p>
        <p style={estiloMensagem}>
          Para acessar esta área, você precisa fazer o login.
        </p>
        <Link to="/login" style={estiloLink}>
          Fazer Login
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default AcessoNegado;
