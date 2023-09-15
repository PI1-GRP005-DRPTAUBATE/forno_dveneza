import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Perfil from "./Perfil";
import { AuthProvider } from "../../context/AuthContext";

global.fetch = jest.fn();
jest.mock("../../componentes/Header", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Header Component</div>),
}));

jest.mock("../../componentes/Footer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Footer Component</div>),
}));

describe("<Perfil />", () => {
  it("Renderiza o componente Perfil corretamente", () => {
    render(
      <AuthProvider>
        <Perfil />
      </AuthProvider>
    );

    const seuPerfilHeader = screen.getByText("Meu perfil");
    expect(seuPerfilHeader).toBeInTheDocument();

    const nomeField = screen.getByText("Nome");
    const sobrenomeField = screen.getByText("Sobrenome");
    const nomeUsuarioField = screen.getByText("Nome de usuário");
    const emailField = screen.getByText("Email");
    const cpfField = screen.getByText("CPF");

    expect(nomeField).toBeInTheDocument();
    expect(sobrenomeField).toBeInTheDocument();
    expect(nomeUsuarioField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(cpfField).toBeInTheDocument();
  });
});
