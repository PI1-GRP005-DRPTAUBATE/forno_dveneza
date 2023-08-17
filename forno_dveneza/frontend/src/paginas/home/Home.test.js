import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  it("Renderizando o titulo corretamente", () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(
      "Bem-vindo à Pizzaria Forno D'Veneza!"
    );
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("Renderizando a secao sobre", () => {
    render(<Home />);
    const aboutSection = screen.getByText("Somos apaixonados por pizza");
    expect(aboutSection).toBeInTheDocument();
  });

  it("Renderizando o link do WhatsApp corretamente", () => {
    render(<Home />);
    const whatsappLink = screen.getByRole("link", {
      name: /Faça seu pedido via WhatsApp/i,
    });
    expect(whatsappLink).toBeInTheDocument();
  });

  it("Renderizando o link do Ifood corretamente", () => {
    render(<Home />);
    const ifoodLink = screen.getByRole("link", {
      name: /Faça seu pedido via Ifood/i,
    });
    expect(ifoodLink).toBeInTheDocument();
  });
});
