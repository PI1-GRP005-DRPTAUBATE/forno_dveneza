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
import MeusPedidos from "./paginas/clientes/MeusPedidos";
import PrivateRoute from "./context/PrivateRoute";

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
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/cardapio" element={<Cardapio />} />
              <Route
                path="/minha-area"
                element={
                  <PrivateRoute>
                    <MinhaArea />
                  </PrivateRoute>
                }
              />
              <Route
                path="/carrinho"
                element={
                  <PrivateRoute>
                    <Carrinho />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pedidos"
                element={
                  <PrivateRoute>
                    <MeusPedidos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/finalizar-compra"
                element={
                  <PrivateRoute>
                    <FinalizarCompra />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
