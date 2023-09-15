import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

describe("<Home />", () => {
  it("Renderiza o componente Home corretamente", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );

    const title = screen.getByText("Bem-vindo à Pizzaria Forno D'Veneza!");
    expect(title).toBeInTheDocument();

    const sobreText = screen.getByText("Sobre nós");
    const ondeEstamosText = screen.getByText("Onde estamos");
    const façaSeuPedidoText = screen.getByText("Faça seu pedido");

    expect(sobreText).toBeInTheDocument();
    expect(ondeEstamosText).toBeInTheDocument();
    expect(façaSeuPedidoText).toBeInTheDocument();
  });
});
