import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Perfil = () => {
  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
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

          setNome(response.data.nome || "");
          setSobrenome(response.data.sobrenome || "");
          setTelefone(response.data.telefone || "");
          setCelular(response.data.celular || "");
          setCep(response.data.cep || "");
          setEndereco(response.data.endereco || "");
          setBairro(response.data.bairro || "");
          setCidade(response.data.cidade || "");
          setEstado(response.data.estado || "");
          setNomeUsuario(response.data.username || "");
          setEmail(response.data.email || "");
          setUsuario(userId);
          setSexo(response.data.sexo || "");
          setDataNascimento(response.data.data_nascimento || "");
          setCpf(response.data.cpf || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [usuarioLogado, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clienteId === null) {
        const response = await Axios.post(
          `http://127.0.0.1:8000/api/usuario/novo-cliente/`,
          {
            nome,
            sobrenome,
            nomeUsuario,
            email,
            telefone,
            celular,
            cep,
            endereco,
            bairro,
            cidade,
            estado,
            sexo,
            data_nascimento: dataNascimento,
            cpf,
            usuario,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        const response = await Axios.put(
          `http://127.0.0.1:8000/api/usuario/editar-cliente/${clienteId}/`,
          {
            nome,
            sobrenome,
            nomeUsuario,
            email,
            telefone,
            celular,
            cep,
            endereco,
            bairro,
            cidade,
            estado,
            sexo,
            data_nascimento: dataNascimento,
            cpf,
            usuario,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-CSRFToken": csrfToken,
            },
          }
        );
        console.log(" TOKEN", csrfToken);
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const renderUserInfo = (label, value, setValue, readOnly = false) => {
    return (
      <div className="info-cel">
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

  const renderSexo = () => {
    return (
      <div className="info-cel">
        <label className="form-label">Sexo</label>
        <select
          className="form-select"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        >
          <option value="">Selecione o sexo</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
          <option value="N">Não informado</option>
        </select>
      </div>
    );
  };

  const renderEstado = () => {
    return (
      <div className="info-cel">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={cidade}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Selecione o estado</option>
          <option value="SP">São Paulo</option>
          <option value="'NI'">Não informado</option>
        </select>
      </div>
    );
  };

  const deletarUsuario = async () => {
    try {
      const response = await Axios.delete(
        `http://127.0.0.1:8000/api/usuario/deletar-cliente/${clienteId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken,
          },
        }
      );
      console.log("Resposta da exclusão:", response);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <div className="container w-100 mx-3">
      <div className="w-100">
        <h4 className="my-3" id="seu-perfil">
          Meu perfil
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="w-100 d-flex flex-wrap">
            {renderUserInfo("Nome", nome, setNome)}
            {renderUserInfo("Sobrenome", sobrenome, setSobrenome)}
            {renderUserInfo("Nome de usuário", userNameLogin, null)}
            {renderUserInfo("Email", emailUsuario, null)}
            {renderUserInfo("Telefone", telefone, setTelefone)}
            {renderUserInfo("Celular", celular, setCelular)}
          </div>
          <div className="w-100 d-flex flex-wrap">
            {renderUserInfo("CEP", cep, setCep)}
            {renderUserInfo("Endereço", endereco, setEndereco)}
            {renderUserInfo("Bairro", bairro, setBairro)}
            {renderUserInfo("Cidade", cidade, setCidade)}
            {renderEstado()}
            {renderSexo()}
            {renderUserInfo(
              "Data de Nascimento",
              dataNascimento,
              setDataNascimento
            )}
            {renderUserInfo("CPF", cpf, setCpf)}
            {renderUserInfo("Usuario", userId, null)}
          </div>
          <button type="submit" className="btn mb-5">
            Atualizar dados
          </button>
          <button type="submit" className="btn mb-5" onClick={deletarUsuario}>
            Deletar usuário
          </button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;