import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./paginas/home/Home";
import Cardapio from "./paginas/cardapio/Cardapio";
import Login from "./paginas/login/Login";
import Cadastro from "./paginas/cadastro/Cadastro";
import { AuthProvider } from "./context/AuthContext";
import Perfil from "./paginas/clientes/Perfil";
import MinhaArea from "./paginas/clientes/MinhaArea";
import Carrinho from "./paginas/carrinho/Carrinho";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import FinalizarCompra from "./paginas/pedido/FinalizarCompra";

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/minha-area" element={<MinhaArea />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/cardapio" element={<Cardapio />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/finalizar-compra" element={<FinalizarCompra />} />
            </Routes>
          </div>
        </Router>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
