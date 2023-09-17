import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FinalizarCompra from "./FinalizarCompra";
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

describe("<FinalizarCompra />", () => {
  test("Renderiza o componente corretamente", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <FinalizarCompra />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText("CEP")).toBeInTheDocument();
    expect(screen.getByText("Endereço")).toBeInTheDocument();
    expect(screen.getByText("Complemento")).toBeInTheDocument();
    expect(screen.getByText("Referência")).toBeInTheDocument();
    expect(screen.getByText("Bairro")).toBeInTheDocument();
    expect(screen.getByText("Cidade")).toBeInTheDocument();
    expect(screen.getByText("Forma de pagamento")).toBeInTheDocument();
  });
});
