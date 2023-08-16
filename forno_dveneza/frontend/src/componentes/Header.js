import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../img/pizza.png";
import "./Header.css";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/usuarios/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
      })
      .catch((error) => {
        console.error("Error fetching authentication status:", error);
      });
  }, []);

  return (
    <header>
      <div className="px-3 py-2">
        <div className="container">
          <div className="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none fs-1 logo-container"
            >
              <img src={logo} alt="Logo" className="mx-2" />
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
                {authenticated ? (
                  <Link to="/sair" className="nav-link text-white">
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
  );
};

export default Header;
