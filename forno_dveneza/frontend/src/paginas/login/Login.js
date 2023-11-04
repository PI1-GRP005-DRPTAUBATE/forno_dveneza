import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import { useAuth } from "../../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const navigate = useNavigate();
  const [nomeDeUsuario, setNomeDeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const {
    setUsuarioLogado,
    setUserId,
    setAccessToken,
    accessToken,
    setClienteId,
    clienteId,
    setNomeDeUsuarioLogin,
    setEmailUsuario,
    userId,
    csrfToken,
    setCsrfToken,
  } = useAuth();
  
  const { usuarioLogado } = useAuth();
  const recuperarTokenDeAcesso = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setUsuarioLogado(true);
    }
  };
  useEffect(() => {
    recuperarTokenDeAcesso();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setCarregando(true);

    Axios.post(
      "http://127.0.0.1:8000/api/usuario/token/",
      `username=${nomeDeUsuario}&password=${senha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        setUsuarioLogado(true);
        setAccessToken(response.data.access);

        localStorage.setItem('accessToken', response.data.access);

        setCarregando(false);
        setMensagemSucesso("Login bem-sucedido!");

        setTimeout(() => {
          setMensagemSucesso("");
        }, 2000);

        setTimeout(() => {
          navigate("/minha-area");
        }, 2000);
      })
      .catch((error) => {
        setCarregando(false);
        if (error.response && error.response.status === 401) {
          setMensagemErro("Usuário e/ou senha incorreto(s)");

          setTimeout(() => {
            setMensagemErro("");
          }, 3000);
        } else if (error.response && error.response.status === 404) {
          setMensagemErro("Nome de usuário ou senha incorretos");

          setTimeout(() => {
            setMensagemErro("");
          }, 3000);
        } else {
          setMensagemErro(
            "Erro desconhecido. Por favor, tente novamente mais tarde."
          );

          setTimeout(() => {
            setMensagemErro("");
          }, 3000);
        }
      });
  };

  useEffect(() => {
    if (usuarioLogado) {
      Axios.get("http://127.0.0.1:8000/api/usuario/informacoes/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.data.id) {
            setClienteId(response.data.id);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setClienteId(null);
          } else {
            setMensagemErro(
              "Erro na rede. Por favor, tente novamente mais tarde."
            );
          }
        });
    }
  }, [usuarioLogado, accessToken]);

  useEffect(() => {
    const obterTokenCSRF = async () => {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/admin/");
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "text/html");
        const csrf = doc.querySelector(
          "input[name='csrfmiddlewaretoken']"
        ).value;
        setCsrfToken(csrf);
      } catch (error) {
        console.error("Erro ao buscar o token CSRF:", error);
      }
    };

    obterTokenCSRF();
  }, []);

  return (
    <div>
      <Header />
      <section>
        <main className="form-signin-container">
          <form onSubmit={handleSubmit}>
            <div className="login-icon">
              <i
                className="bi bi-person-circle display-1 custom-icon"
                style={{ color: "#1abc9c" }}
              ></i>

              <h1 style={{ fontSize: "20px", fontWeight: "normal" }}>Login</h1>
            </div>

            <div className="form-floating my-2">
              <label for="usernameInput">Entre com o nome de usuário</label>
              <input
                type="text"
                id="floatingInput"
                placeholder="Nome de usuário"
                value={nomeDeUsuario}
                onChange={(e) => setNomeDeUsuario(e.target.value)}
              />
            </div>
            <div className="form-floating my-2">
              <label for="floatingPassword">Entre com a sua senha</label>
              <input
                type="password"
                id="floatingPassword"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="checkbox my-3">
              <label>
                <input type="checkbox" value="remember-me" /> Lembrar
              </label>
            </div>
            <button
              className="btn-login"
              type="submit"
              disabled={carregando}
              style={{ color: "#ffffff", fontSize: "18px" }}
            >
              {carregando ? "Carregando..." : "Entrar"}
            </button>
            <div type="submit" style={{ marginTop: "15px" }}>
              <span>
                Não tem cadastro? Clique <Link to="/cadastro">aqui</Link>
              </span>
            </div>
          </form>
        </main>
        {mensagemSucesso && (
          <div className="my-3 text-center">
            <span className="text-success">{mensagemSucesso}</span>
          </div>
        )}

        {mensagemErro && (
          <div className="my-3 text-center">
            <span className="text-danger">{mensagemErro}</span>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Login;
