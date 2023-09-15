import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cadastro from "./Cadastro";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn();
jest.mock("../../componentes/Header", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Header Component</div>),
}));

jest.mock("../../componentes/Footer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Footer Component</div>),
}));
describe("<Cadastro />", () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  it("Renderiza a página de cadastro", () => {
    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    const textoCadastro = screen.getByText("Cadastro de usuário");
    expect(textoCadastro).toBeInTheDocument();
  });

  it("Cadastro feito com sucesso", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nome de usuário"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      const avisoMessage = screen.getByText("Usuário cadastrado com sucesso");
      expect(avisoMessage).toBeInTheDocument();
    });
  });

  it("Simula erro de usuário já cadastrado", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          username: ["Username already taken"],
        }),
    });

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Nome de usuário"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      const errorMessage = screen.getByText("Username already taken");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
