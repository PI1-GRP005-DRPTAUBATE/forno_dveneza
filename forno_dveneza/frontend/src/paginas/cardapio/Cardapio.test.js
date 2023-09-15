import React from "react";
import { render } from "@testing-library/react";
import Cardapio from "./Cardapio";
import { AuthProvider } from "../../context/AuthContext.js";

global.fetch = jest.fn();
jest.mock("../../componentes/Header", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Header Component</div>),
}));

jest.mock("../../componentes/Footer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Footer Component</div>),
}));

describe("Pagina de Cardapio", () => {
  it("renderizando cardapio", () => {
    render(
      <AuthProvider>
        <Cardapio />
      </AuthProvider>
    );
  });

  it("renderizando os elementos da pagina de cardapio", () => {
    const { getByText } = render(<Cardapio />);
    const titleElement = getByText("Cardápio");
    expect(titleElement).toBeInTheDocument();
  });
});
