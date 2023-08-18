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
      setCategorias(response.data.map((product) => product.id_categoria));
      setCadastrado(response.data.cadastrado);
    });
  }, []);

  return (
    <div>
      <Header />
      <h3
        className="cardapio-titulo"
        style={{ textAlign: "center", fontSize: "26px" }}
      >
        Cardápio
      </h3>
      {categorias.length > 0 &&
        categorias.map((categoria) => (
          <div key={categoria}>
            <h4 className="m-0 mx-3">{categoria}s</h4>
            <section className="d-flex justify-content-center my-5 cardapio flex-column flex-wrap">
              {produtos.map(
                (produto) =>
                  produto.id_categoria === categoria && (
                    <div key={produto.id} className="card mb-3 w-75">
                      <div className="d-flex">
                        <div className="d-flex col-md-5 w-25 m-auto justify-content-center">
                          <img
                            src={produto.foto.url}
                            className="cardapio-img"
                            alt={`Imagem ${produto.nome}`}
                          />
                        </div>
                        <div className="w-75 text-end">
                          <div class="card-body">
                            <h5 className="card-title text-start">
                              {produto.nome}
                            </h5>
                            <p className="card-text text-start">
                              {produto.descricao}
                            </p>
                            <p className="card-text text-start">
                              <small>R$ {produto.preco_unidade}</small>
                            </p>
                            <Link
                              to={`adicionar_produto/${produto.id}`}
                              className="btn-carrinho"
                            >
                              Adicionar ao carrinho
                            </Link>
                          </div>
                        </div>
                      </div>
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
      <Footer />
    </div>
  );
};

export default Cardapio;
