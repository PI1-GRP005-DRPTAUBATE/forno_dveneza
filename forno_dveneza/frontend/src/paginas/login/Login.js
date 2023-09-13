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
    setUserNameLogin,
    setEmailUsuario,
    userId,
    csrfToken,
    setCsrfToken,
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
        setUsuarioLogado(true);
        setAccessToken(response.data.access);
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
            setErrorMessage("Network error. Please try again later.");
          }
        });
    }
  }, [usuarioLogado, accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await Axios.post(
          "http://127.0.0.1:8000/api/usuario/token/",
          `username=${username}&password=${password}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setUsuarioLogado(true);
        setAccessToken(authResponse.data.access);

        const userInfoResponse = await Axios.get(
          "http://127.0.0.1:8000/api/usuario/informacoes/",
          {
            headers: {
              Authorization: `Bearer ${authResponse.data.access}`,
            },
          }
        );

        if (userInfoResponse.data.id) {
          setClienteId(userInfoResponse.data.id);
          const usersResponse = await Axios.get(
            "http://127.0.0.1:8000/api/usuarios/"
          );
          const buscaUsuario = usersResponse.data.find(
            (user) => user.username === username
          );

          if (buscaUsuario) {
            setUserId(buscaUsuario.id);
            setEmailUsuario(buscaUsuario.email);
            setUserNameLogin(buscaUsuario.username);
          }

          navigate("/minha-area");
        }
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          setErrorMessage("Usuário não encontrado");
        } else {
          setErrorMessage(
            "Erro desconhecido. Por favor, tente novamente mais tarde."
          );
        }
      }
    };

    if (usuarioLogado) {
      fetchData();
    }
  }, [usuarioLogado, username]);

  const getCsrfToken = async () => {
    try {
      const response = await Axios.get("http://127.0.0.1:8000/admin/");
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, "text/html");
      const csrf = doc.querySelector("input[name='csrfmiddlewaretoken']").value;
      setCsrfToken(csrf);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  useEffect(() => {
    getCsrfToken();
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
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
            </div>

            <div className="checkbox my-3">
              <label>
                <input type="checkbox" value="remember-me" /> Lembrar
              </label>
            </div>
            <button
              className="btn-login"
              type="submit"
              disabled={loading}
              style={{ color: "#ffffff", fontSize: "18px", width: "107%" }}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <div type="submit" style={{ marginTop: "15px" }}>
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
