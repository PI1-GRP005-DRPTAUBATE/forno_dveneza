import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AcessoNegado from "../paginas/acesso-negado/AcessoNegado";

const PrivateRoute = ({ children }) => {
  const { usuarioLogado } = useAuth();

  return usuarioLogado ? children : <AcessoNegado />;
};

export default PrivateRoute;
