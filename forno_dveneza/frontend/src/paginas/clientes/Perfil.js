import React, { useState, useEffect } from "react";
import Axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/AuthContext";
import "./MinhaArea.css";
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
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const decodedToken = jwtDecode(accessToken);
      const decodedUserId = decodedToken.user_id;

      const fetchUserData = async () => {
        try {
          const response = await Axios.get(
            `https://fornodveneza.pythonanywhere.com/api/usuarios/${decodedUserId}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setNomeUsuario(response.data.username);
          setEmail(response.data.email);
          setUsuario(decodedUserId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();

      const fetchData = async () => {
        try {
          const response = await Axios.get(
            `https://fornodveneza.pythonanywhere.com/api/usuario/informacoes/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          localStorage.setItem("idCliente", response.data.id ?? null);
          setNome(response.data.nome || "");
          setSobrenome(response.data.sobrenome || "");
          setTelefone(response.data.telefone || "");
          setCelular(response.data.celular || "");
          setCep(response.data.cep || "");
          setEndereco(response.data.endereco || "");
          setBairro(response.data.bairro || "");
          setCidade(response.data.cidade || "");
          setEstado(response.data.estado || "");
          setSexo(response.data.sexo || "");
          setDataNascimento(response.data.data_nascimento || "");
          setCpf(response.data.cpf || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   if (usuarioLogado && !clienteId) {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const decodedToken = jwtDecode(accessToken);
  //     const decodedUserId = decodedToken.user_id;
  //     const fetchData = async () => {
  //       try {
  //         const response = await Axios.get(
  //           `https://fornodveneza.pythonanywhere.com/api/usuarios/${decodedUserId}/`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           }
  //         );
  //         setNomeUsuario(response.data.username);
  //         setEmail(response.data.email);
  //         setUsuario(decodedUserId);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem('idCliente') === null) {
        const response = await Axios.post(
          `https://fornodveneza.pythonanywhere.com/api/usuario/novo-cliente/`,
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
        window.alert("Dados atualizados com sucesso!")
      } else {
        const response = await Axios.put(
          `https://fornodveneza.pythonanywhere.com/api/usuario/editar-cliente/${localStorage.getItem('idCliente')}/`,
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
        window.alert("Dados atualizados com sucesso!")
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const renderUserInfo = (label, value, setValue, readOnly = false) => {
    return (
      <div className="info-cel" style={{ marginTop: "15px" }}>
        <label for={label} className="form-label">{label}</label>
        <input
          id={label}
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
      <div className="info-cel" style={{ marginTop: "15px" }}>
        <label for="sexoSelect" className="form-label">Sexo</label>
        <select
          id="sexoSelect"
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
      <div className="info-cel" style={{ marginTop: "15px" }}>
        <label for="selectEstado" className="form-label">Estado</label>
        <select
          id="selectEstado"
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
        `https://fornodveneza.pythonanywhere.com/api/usuario/deletar-cliente/${clienteId}/`,
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
          <div className="row">
            <div className="col-md-4">
              {renderUserInfo("Nome", nome, setNome)}
              {renderUserInfo("CPF", cpf, setCpf)}

              {renderUserInfo("Email", email, null)}
              {renderUserInfo("CEP", cep, setCep)}
              {renderUserInfo("Cidade", cidade, setCidade)}
            </div>

            <div className="col-md-4">
              {renderUserInfo("Sobrenome", sobrenome, setSobrenome)}
              {renderUserInfo("Telefone", telefone, setTelefone)}
              {renderUserInfo("Endereço", endereco, setEndereco)}
              {renderEstado()}
              {renderUserInfo(
                "Data de Nascimento",
                dataNascimento,
                setDataNascimento
              )}
            </div>
            <div className="col-md-4">
              {renderUserInfo("Nome de usuário", nomeUsuario)}
              {renderUserInfo("Celular", celular, setCelular)}
              {renderUserInfo("Bairro", bairro, setBairro)}
              {renderUserInfo("Usuario", usuario, null)}
              {renderSexo()}
            </div>
          </div>
          <div style={{ marginTop: "50px", display: "flex", gap: "40px" }}>
            <button
              type="submit"
              className="btn-minha-area"
              style={{ height: "40px", width: "150px", fontSize: "16px" }}
            >
              <p className="btn-minha-area-text">Atualizar dados</p>
            </button>
            {/* <button
              type="submit"
              className="btn-minha-area"
              onClick={deletarUsuario}
              style={{ height: "40px", width: "150px", fontSize: "16px" }}
            >
              <p className="btn-minha-area-text">Deletar usuário</p>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
