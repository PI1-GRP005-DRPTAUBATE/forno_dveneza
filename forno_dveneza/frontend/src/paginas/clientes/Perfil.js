import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Perfil = () => {
  const [user, setUser] = useState([]);
  const [cliente, setCliente] = useState([]);
  const { userData } = useAuth();
  const { usuarioLogado } = useAuth();
  const { setUsuarioLogado } = useAuth();

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/usuarios/").then((response) => {
      console.log("API Response:", response);

      const userData = response.data.find((item) => item.user);
      const clienteData = response.data.find((item) => item.cliente);

      setUser(userData ? userData.user : {});
      setCliente(clienteData ? clienteData.cliente : {});

      console.log("usuario", userData ? userData.user : {});
      console.log("email", userData ? userData.user[2].username : {});
      console.log("usuarioLogado", usuarioLogado);
    });
  }, []);

  return (
    <div className="container w-100 mx-3">
      <div className="w-100">
        <h4 className="my-3" id="seu-perfil">
          Meu perfil
        </h4>
        <div className="w-100 d-flex flex-wrap">
          <div className="info-cel">
            <label className="form-label">Nome</label>
            {cliente.username ? (
              <p className="form-control">{cliente.username}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Sobrenome</label>
            {cliente.sobrenome ? (
              <p className="form-control">{cliente.sobrenome}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Nome de usuário</label>
            <p className="form-control">{user.username}</p>
          </div>
          <div className="info-cel">
            <label className="form-label">Email</label>
            {user.email ? (
              <p className="form-control">{user.email}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Telefone</label>
            {cliente.telefone ? (
              <p className="form-control">{cliente.telefone}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Celular</label>
            {cliente.celular ? (
              <p className="form-control">{cliente.celular}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap">
          <div className="info-cel">
            <label className="form-label">CEP</label>
            {cliente.cep ? (
              <p className="form-control">{cliente.cep}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Endereço</label>
            {cliente.endereco ? (
              <p className="form-control">{cliente.endereco}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Bairro</label>
            {cliente.bairro ? (
              <p className="form-control">{cliente.bairro}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Cidade</label>
            {cliente.cidade ? (
              <p className="form-control">{cliente.cidade}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
          <div className="info-cel">
            <label className="form-label">Estado</label>
            {cliente.estado ? (
              <p className="form-control">{cliente.estado}</p>
            ) : (
              <p className="form-control text-danger">Não cadastrado</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            window.location.href = "{URL_DA_ROTA_DE_EDICAO}";
          }}
          className="btn mb-5"
        >
          Atualizar dados
        </button>
      </div>
    </div>
  );
};

export default Perfil;
