import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MinhaArea from "./MinhaArea";
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

describe("<MinhaArea />", () => {
  it("Renderiza a página MinhaArea com links para Perfil e Pedidos", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <MinhaArea />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkPerfil = screen.getByRole("link", { name: /perfil/i });
    const linkPedidos = screen.getByRole("link", { name: /pedidos/i });

    expect(linkPerfil).toBeInTheDocument();
    expect(linkPedidos).toBeInTheDocument();
  });

  it("Navega para a página de Perfil ao clicar no link", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <MinhaArea />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkPerfil = screen.getByRole("link", { name: /perfil/i });

    fireEvent.click(linkPerfil);

    const perfilHeader = screen.getByText("Meu perfil");
    expect(perfilHeader).toBeInTheDocument();
  });

  it("Navega para a página de Pedidos ao clicar no link", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <MinhaArea />
        </AuthProvider>
      </MemoryRouter>
    );

    const linkPedidos = screen.getByRole("link", { name: /pedidos/i });

    fireEvent.click(linkPedidos);
    const perfilHeader = screen.getByText("Meus pedidos");
    expect(perfilHeader).toBeInTheDocument();
  });
});
