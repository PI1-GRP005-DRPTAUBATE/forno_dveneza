import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./MinhaArea.css";
import Perfil from "./Perfil";

const MinhaArea = () => {
  return (
    <div className="d-flex flex-column w-100">
      <Header />
      <div
        className="d-flex flex-column align-items-center"
        style={{
          margin: "20px",
        }}
      >
        <div>
          <button class="btn-minha-area">
            <Link to="/minha-area">
              <p className="btn-minha-area-text">Perfil</p>
            </Link>
          </button>
        </div>
        <div>
          <button class="btn-minha-area">
            <Link to="/pedidos">
              <p className="btn-minha-area-text">Pedidos</p>
            </Link>
          </button>
        </div>
      </div>
      <div>
        <Perfil />
      </div>
      <Footer />
    </div>
  );
};

export default MinhaArea;
