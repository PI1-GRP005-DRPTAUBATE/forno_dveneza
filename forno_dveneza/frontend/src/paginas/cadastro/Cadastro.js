import React, { useState } from "react";
import "./Cadastro.css";
import { Link } from "react-router-dom";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";


const Cadastro = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    senha: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [avisoMessage, setAvisoMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      username: formData.usuario,
      email: formData.email,
      password: formData.senha,
    };

    fetch("http://127.0.0.1:8000/api/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.username && data.username.length > 0) {
          setAvisoMessage("Usuário cadastrado com sucesso");
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setErrorMessage("Ocorreu um erro ao cadastrar o usuário.");
        setAvisoMessage("");
      });
  };

  return (
    <div>
      <Header />
      <section>
        <main className="form-cadastro-container">
          <form onSubmit={handleSubmit}>
            <div className="login-icon">
              <i
                className="bi bi-person-circle display-1 custom-icon"
                style={{ color: "#1abc9c" }}
              ></i>

              <h1 style={{ fontSize: "20px", fontWeight: "normal" }}>
                {" "}
                Cadastro de usuário
              </h1>
            </div>
            <div className="form-floating my-2">
              <label for="usernameInput">Entre com o nome de usuário</label>
              <input
                type="text"
                id="usernameInput"
                placeholder="Nome de usuário"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
              />
            </div>
            <div className="form-floating my-2">
              <label for="emailInput">Entre com o seu email</label>
              <input
                type="email"
                id="emailInput"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-floating my-2">
              <label for="floatingPassword">Entre com a sua senha</label>
              <input
                type="password"
                id="floatingPassword"
                placeholder="Senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
            <button
              className="btn-login"
              type="submit"
              style={{ marginBottom: "20px", width: "100%" }}
            >
              Cadastrar
            </button>
            {errorMessage && (
              <div className="my-3 text-center">
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
            {avisoMessage && (
              <div className="my-3 text-center">
                <span className="text-success">{avisoMessage}</span> <hr />
                <Link to="/login" className="btn-login">
                  Fazer Login
                </Link>
              </div>
            )}
          </form>
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default Cadastro;
