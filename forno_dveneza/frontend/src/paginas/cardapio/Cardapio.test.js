import React from "react";
import { render } from "@testing-library/react";
import Cardapio from "./Cardapio";

describe("Pagina de Cardapio", () => {
  it("renderizando cardapio", () => {
    render(<Cardapio />);
  });

  it("renderizando os elementos da pagina de cardapio", () => {
    const { getByText } = render(<Cardapio />);
    const titleElement = getByText("Cardápio");
    expect(titleElement).toBeInTheDocument();
  });
});
