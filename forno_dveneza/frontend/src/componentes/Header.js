import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/pizza.png";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { usuarioLogado } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const closeMenu = () => {
    setMenuAberto(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuAberto) {
      const timeoutId = setTimeout(() => {
        closeMenu();
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [menuAberto]);

  const Logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo-img mx-2" />
              <span className="logo-text hide-on-large-screen">
                Forno D'Veneza
              </span>
            </div>
          </Link>

          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="menu-desk">
            <ul>
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

          {menuAberto && (
            <ul ref={menuRef} className="navbar-nav show">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cardapio" className="nav-link" onClick={closeMenu}>
                  Cardápio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/carrinho" className="nav-link" onClick={closeMenu}>
                  Carrinho
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/minha-area" className="nav-link" onClick={closeMenu}>
                  Minha área
                </Link>
              </li>
              <li className="nav-item">
                {usuarioLogado ? (
                  <Link className="nav-link text-white" onClick={Logout}>
                    Sair
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link" onClick={closeMenu}>
                    Login
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
