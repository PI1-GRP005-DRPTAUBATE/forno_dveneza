import React, { useState } from "react";

function CadastroUsuario() {
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        senha: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            username: formData.usuario,
            email: formData.email,
            password: formData.senha
        };

        fetch("http://127.0.0.1:8000/api/usuarios/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',

        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success: ', data )
          })
          .catch((error) => {
            console.log('Error: ', error)
          })
    }

    return(
        <>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>usuario:</label>
                    <input type="text" name="usuario" value={formData.usuario} onChange={handleChange}></input>
                </div>
                <div>
                    <label>email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}></input>
                </div>
                <div>
                    <label>senha:</label>
                    <input type="password" name="senha" value={formData.senha} onChange={handleChange}></input>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </>
    );
}

export default CadastroUsuario;