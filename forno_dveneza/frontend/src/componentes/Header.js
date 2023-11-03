import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/pizza.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { usuarioLogado } = useAuth();

  const Logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  return (
    <main className="main-content">
      <header>
        <div className="px-3 py-2" style={{ width: "100%" }}>
          <div className="container">
            <div className="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link
                to="/"
                className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none fs-1 logo-container"
              >
                <img src={logo} alt="Desenho de uma fatia de pizza" className="mx-2" />
                <span className="logo-text">Forno D'Veneza</span>
              </Link>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <Link to="/" className="nav-link text-white">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/cardapio" className="nav-link text-white">
                    Cardápio
                  </Link>
                </li>
                <li>
                  <Link to="/carrinho" className="nav-link text-white">
                    Carrinho
                  </Link>
                </li>
                <li>
                  <Link to="/minha-area" className="nav-link text-white">
                    Minha área
                  </Link>
                </li>
                <li>
                  {usuarioLogado ? (
                    <Link
                      className="nav-link
                   text-white"
                      onClick={Logout}
                    >
                      Sair
                    </Link>
                  ) : (
                    <Link to="/login" className="nav-link text-white">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Header;
