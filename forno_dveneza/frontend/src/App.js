import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./paginas/home/Home";
import Cardapio from "./paginas/cardapio/Cardapio";
import Login from "./paginas/login/Login";
import Cadastro from "./paginas/cadastro/Cadastro";
import { AuthProvider } from "./context/AuthContext";
import Perfil from "./paginas/clientes/Perfil";
import MinhaArea from "./paginas/clientes/MinhaArea";
import Carrinho from "./paginas/carrinho/Carrinho";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/minha-area" element={<MinhaArea />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
