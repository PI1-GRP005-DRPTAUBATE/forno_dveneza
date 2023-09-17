import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";

const FinalizarCompra = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [referencia, setReferencia] = useState("");
  const [complemento, setComplemento] = useState("");
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const {
    userId,
    usuarioLogado,
    accessToken,
    clienteId,
    userNameLogin,
    emailUsuario,
    csrfToken,
  } = useAuth();

  useEffect(() => {
    if (usuarioLogado && clienteId) {
      const fetchData = async () => {
        try {
          const response = await Axios.get(
            `http://127.0.0.1:8000/api/usuario/informacoes/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setCep(response.data.cep || "");
          setEndereco(response.data.endereco || "");
          setBairro(response.data.bairro || "");
          setCidade(response.data.cidade || "");
          setReferencia(response.data.referencia || "");
          setComplemento(response.data.complemento || "");
          setFormaDePagamento(response.data.formaDePagamento || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [usuarioLogado, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clienteId != null) {
      setAlertaVisivel(true);

      const response = await Axios.post(
        `http://127.0.0.1:8000/api/usuario/novo-cliente/`,
        {
          cep,
          endereco,
          bairro,
          cidade,
          complemento,
          referencia,
          formaDePagamento,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  };

  const renderUserInfo = (label, value, setValue, readOnly = false) => {
    return (
      <div className="form-container">
        <label className="form-label">{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder={value ? value : "Não cadastrado"}
          value={value}
          onChange={setValue ? (e) => setValue(e.target.value) : undefined}
          readOnly={readOnly}
        />
      </div>
    );
  };

  const renderFormadePagamento = () => {
    return (
      <div style={{ marginTop: "15px" }}>
        <label className="form-label">Forma de pagamento</label>
        <select
          className="form-select"
          value={formaDePagamento}
          onChange={(e) => setFormaDePagamento(e.target.value)}
        >
          <option value="">Selecione a forma de pagamento</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="pix">Pix</option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h2>Informações de entrega do seu pedido</h2>
      </div>
      <div
        className="form-container"
        style={{ width: "400px", margin: "30px auto 0" }}
      >
        <form onSubmit={handleSubmit}>
          {renderUserInfo("CEP", cep, setCep)}
          {renderUserInfo("Endereço", endereco, setEndereco)}
          {renderUserInfo("Complemento", complemento, setComplemento)}
          {renderUserInfo("Referência", referencia, setReferencia)}
          {renderUserInfo("Bairro", bairro, setBairro)}
          {renderUserInfo("Cidade", cidade, setCidade)}
          {renderFormadePagamento()}
          <div className="btn-container-carrinho" style={{ marginTop: "30px" }}>
            <button
              type="submit"
              className="btn-carrinho-checkout"
              onClick={handleSubmit}
              style={{ boxShadow: "none" }}
            >
              <p> Confirmar pedido </p>
            </button>
            <Link to={"/cardapio"} className="btn-carrinho-checkout">
              <p> Cancelar</p>
            </Link>
          </div>
        </form>
      </div>
      {alertaVisivel && (
        <div className="overlay">
          <div className="alert-container">
            <div
              id="alertaProduto"
              className="alert alert-success w-50 text-center alert-dismissible fade show"
              role="alert"
            >
              Pedido feito com sucesso!
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

export default FinalizarCompra;
