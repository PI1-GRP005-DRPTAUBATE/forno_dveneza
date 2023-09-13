import React, { useState, useEffect } from "react";
import "./Cardapio.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cadastrado, setCadastrado] = useState(false);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/produtos/").then((response) => {
      console.log("API Response:", response.data);
      setProdutos(response.data);
      setCadastrado(response.data.cadastrado);
      Axios.get("http://127.0.0.1:8000/api/categorias/").then(
        (responseCategoria) => {
          console.log(
            "API responseCategoria CATEGORIAS:",
            responseCategoria.data
          );
          setCategorias(responseCategoria.data.map((categoria) => categoria));
          console.log("categorias", categorias);
        }
      );
    });
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{ padding: "40px", marginLeft: "30px", paddingBottom: "180px" }}
      >
        <h3
          className="cardapio-titulo"
          style={{ textAlign: "center", fontSize: "26px", marginTop: "0px" }}
        >
          Cardápio
        </h3>
        {categorias.length > 0 &&
          categorias.map((categoria) => (
            <div key={categoria.id}>
              <h4 className="m-0 mx-3">{categoria.descricao}</h4>
              <section className="d-flex justify-content-center my-5 cardapio flex-column flex-wrap">
                {produtos.map(
                  (produto) =>
                    produto.id_categoria === categoria.id && (
                      <div key={produto.id} className="card-produto">
                        <div className="card-img">
                          <img
                            src={produto.foto.url}
                            className="cardapio-img"
                            alt={`Imagem ${produto.nome}`}
                          />
                        </div>
                        <div className="card-info">
                          <h5 className="card-title text-start">
                            {produto.nome}
                          </h5>
                          <p className="card-text text-start">
                            {produto.descricao}
                          </p>
                          <p className="card-text text-start">
                            <small>R$ {produto.preco_unidade}</small>
                          </p>
                        </div>
                        <Link
                          to={`adicionar_produto/${produto.id}`}
                          className="btn-carrinho"
                        >
                          <p className="btn-carrinho-text">
                            Adicionar ao carrinho
                          </p>
                        </Link>
                      </div>
                    )
                )}
              </section>
            </div>
          ))}
        {cadastrado && (
          <div className="d-flex justify-content-center">
            <div
              id="alertaProduto"
              className="alert alert-success w-50 text-center alert-dismissible fade show"
              role="alert"
            >
              Produto adicionado ao seu carrinho!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cardapio;
