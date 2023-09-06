import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    setUsuarioLogado,
    setUserId,
    setAccessToken,
    accessToken,
    setClienteId,
    clienteId,
  } = useAuth();
  const { usuarioLogado } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Axios.post(
      "http://127.0.0.1:8000/api/usuario/token/",
      `username=${username}&password=${password}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        console.log("response autorizacao", response);
        setUsuarioLogado(true);
        setAccessToken(response.data.access);
        console.log("accessToken", response.data.access);
        console.log("accessToken", accessToken);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          setErrorMessage("Usuário não encontrado");
        } else {
          setErrorMessage(
            "Erro desconhecido. Por favor, tente novamente mais tarde."
          );
        }
      });
  };

  useEffect(() => {
    console.log("entrou na requisicao --> ");

    if (usuarioLogado) {
      Axios.get("http://127.0.0.1:8000/api/usuario/informacoes/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.data.id) {
            setClienteId(response.data.id);
            console.log(clienteId);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setClienteId(null);
            console.log(clienteId);
          } else {
            setErrorMessage("Network error. Please try again later.");
          }
        });
    }
  }, [usuarioLogado, accessToken]);

  useEffect(() => {
    if (usuarioLogado) {
      Axios.get("http://127.0.0.1:8000/api/usuarios/")
        .then((response) => {
          console.log("Response USUARIOS:", response);
          const users = response.data;

          const buscaUsuario = users.find((user) => user.username === username);

          if (buscaUsuario) {
            setUserId(buscaUsuario.id);
            console.log("userId", buscaUsuario.id);
          }
          navigate("/minha-area");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [usuarioLogado, username]);

  return (
    <div>
      <Header />
      <section>
        <main className="form-signin w-25 m-auto mt-5 text-center">
          <form onSubmit={handleSubmit}>
            <i className="bi bi-person-circle display-1"></i>
            <h1 className="h3 mb-3 fw-normal">Login</h1>

            <div className="form-floating my-2">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="floatingInput">Nome de usuário</label>
            </div>
            <div className="form-floating my-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Senha</label>
            </div>

            <div className="checkbox my-3">
              <label>
                <input type="checkbox" value="remember-me" /> Lembrar
              </label>
            </div>
            <button
              className="w-100 btn btn-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <div className="my-3">
              <span>
                Não tem cadastro? Clique <Link to="/cadastro">aqui</Link>
              </span>
            </div>
          </form>
        </main>
        {errorMessage && (
          <div className="my-3 text-center">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Login;
