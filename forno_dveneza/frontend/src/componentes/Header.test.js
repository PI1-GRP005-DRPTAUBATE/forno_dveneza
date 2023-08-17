import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("Renderizando a logo e o titulo corretamente", () => {
    render(<Header />);
    const logoText = screen.getByText("Forno D'Veneza");
    expect(logoText).toBeInTheDocument();
  });

  it("Renderizando os links corretamente", () => {
    render(<Header />);
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
