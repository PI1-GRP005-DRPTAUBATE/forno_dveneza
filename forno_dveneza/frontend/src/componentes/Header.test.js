import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../componentes/Header";
import { AuthProvider } from "../context/AuthContext";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    usuarioLogado: true,
  })),
}));

describe("Header Component", () => {
  it("Renderizando a logo e o título corretamente", () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const logoText = screen.getByText("Forno D'Veneza");
    expect(logoText).toBeInTheDocument();
  });

  it("Renderizando os links corretamente", () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const inicioLink = screen.getByText("Início");
    const cardapioLink = screen.getByText("Cardápio");
    const carrinhoLink = screen.getByText("Carrinho");
    const minhaAreaLink = screen.getByText("Minha área");
    const loginLink = screen.getByText("Login");

    expect(inicioLink).toBeInTheDocument();
    expect(cardapioLink).toBeInTheDocument();
    expect(carrinhoLink).toBeInTheDocument();
    expect(minhaAreaLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});
