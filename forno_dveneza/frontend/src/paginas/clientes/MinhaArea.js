import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import "./MinhaArea.css";
import Perfil from "./Perfil";
import { Container, Row, Col } from "react-bootstrap";

const MinhaArea = () => {
  return (
    <div>
      <Header />

      <div className="d-flex w-100">
        <div className="col-md-3">
          <div
            className="d-flex flex-column align-items-center"
            style={{
              margin: "20px",
            }}
          >
            <div>
              <button className="btn-minha-area">
                <Link to="/minha-area" className="link-button">
                  <p className="btn-minha-area-text">Perfil</p>
                </Link>
              </button>
            </div>
            <div>
              <button className="btn-minha-area">
                <Link to="/pedidos" className="link-button">
                  <p className="btn-minha-area-text">Pedidos</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <Perfil />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MinhaArea;
