import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AcessoNegado from "../paginas/acesso-negado/AcessoNegado";

const PrivateRoute = ({ children }) => {
  const {
    setAccessToken,
    setUsuarioLogado
  } = useAuth();
  const { usuarioLogado } = useAuth();
  const recuperarTokenDeAcesso = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setUsuarioLogado(true);
    }
  };
  useEffect(() => {
    // Verifique se há um token de acesso armazenado no localStorage
    recuperarTokenDeAcesso();
  }, []);

  return usuarioLogado ? children : <AcessoNegado />;
};

export default PrivateRoute;
