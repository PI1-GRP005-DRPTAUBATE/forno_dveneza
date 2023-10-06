import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cardapio.css";
import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { useCarrinho } from "../../context/CarrinhoContext";
import CardProduto from "../../componentes/CardProduto";

const Cardapio = ({ borda, pizzaMeia }) => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [cadastrado, setCadastrado] = useState(false);
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const { adicionarProdutoAoCarrinho } = useCarrinho();

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/produtos/").then((response) => {
      console.log("API Response:", response.data);
      setProdutos(response.data);
      console.log("url foto", response.data);

      setCadastrado(response.data.cadastrado);
      Axios.get("http://127.0.0.1:8000/api/categorias/").then(
        (responseCategoria) => {
          console.log(
            "API responseCategoria CATEGORIAS:",
            responseCategoria.data
          );
          setCategorias(responseCategoria.data.map((categoria) => categoria));
          setCategoria(
            responseCategoria.data.map((categoria) => categoria.descricao)
          );
        }
      );
    });
  }, []);

  const alertaCarrinho = () => {
    setAlertaVisivel(true);
    setTimeout(() => {
      setAlertaVisivel(false);
    }, 3000);
  };

  return (
    <div className="centered-content" style={{ marginBottom: "200px" }}>
      <Header />
      <div style={{ padding: "40px" }}>
        <h3 className="cardapio-titulo" style={{ textAlign: "center" }}>
          Cardápio
        </h3>
      </div>

      <div className="centered-content">
        {categorias.length > 0 &&
          categorias.map((categoria) => (
            <div
              key={categoria.id}
              style={{ marginLeft: "200px", marginRight: "300px" }}
            >
              <h4 className="m-0 mx-3">{categoria.descricao}</h4>
              <section className="d-flex flex-wrap">
                {produtos.map(
                  (produto) =>
                    produto.id_categoria === categoria.id && (
                      <CardProduto
                        key={produto.id}
                        produto={produto}
                        adicionarProdutoAoCarrinho={() =>
                          adicionarProdutoAoCarrinho(produto, pizzaMeia, borda)
                        }
                        alertaCarrinho={alertaCarrinho}
                        categoria={categoria.descricao}
                      />
                    )
                )}
              </section>{" "}
            </div>
          ))}
      </div>
      {alertaVisivel && (
        <div className="overlay">
          <div className="alert-container">
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
                onClick={() => setAlertaVisivel(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cardapio;
