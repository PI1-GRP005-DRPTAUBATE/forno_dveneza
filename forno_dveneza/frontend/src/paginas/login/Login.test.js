import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Pagina de Login", () => {
  it("renderiza a pagina de login corretamente", () => {
    render(<Login />);

    const inputUsername = screen.getByPlaceholderText("Nome de usuário");
    const inputPassword = screen.getByPlaceholderText("Senha");
    const submitButton = screen.getByText("Entrar");

    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
