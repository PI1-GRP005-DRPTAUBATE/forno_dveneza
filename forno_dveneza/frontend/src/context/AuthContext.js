import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [clienteId, setClienteId] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState("");
  const [userNameLogin, setUserNameLogin] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  return (
    <AuthContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        clienteId,
        setClienteId,
        emailUsuario,
        setEmailUsuario,
        userNameLogin,
        setUserNameLogin,
        csrfToken,
        setCsrfToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
