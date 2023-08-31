import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
