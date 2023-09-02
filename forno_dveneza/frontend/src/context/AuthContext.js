import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [authTokens, setAuthTokens] = useState();
  const [userData, setUserData] = useState(null);
  return (
    <AuthContext.Provider
      value={{ usuarioLogado, setUsuarioLogado, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
