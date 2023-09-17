import React from "react";
import { screen, render } from "@testing-library/react";
import Carrinho from "./Carrinho";
import { CarrinhoProvider } from "../../context/CarrinhoContext";
import { BrowserRouter as Router } from "react-router-dom";

global.fetch = jest.fn();
jest.mock("../../componentes/Header", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Header Component</div>),
}));

jest.mock("../../componentes/Footer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Footer Component</div>),
}));

jest.mock("../../context/CarrinhoContext", () => ({
  __esModule: true,
  CarrinhoProvider: ({ children }) => <div>{children}</div>,
  useCarrinho: () => ({
    produtosCarrinho: [
      {
        produto: {
          id: 1,
          nome: "Produto 1",
          preco_unidade: 10.0,
        },
        quantidade: 2,
      },
      {
        produto: {
          id: 2,
          nome: "Produto 2",
          preco_unidade: 15.0,
        },
        quantidade: 1,
      },
    ],
  }),
}));

describe("<Carrinho />", () => {
  test("Exibe produtos no carrinho quando o carrinho não está vazio", () => {
    const produtosCarrinho = [
      {
        produto: {
          id: 1,
          nome: "Produto 1",
          preco_unidade: 10.0,
        },
        quantidade: 2,
      },
      {
        produto: {
          id: 2,
          nome: "Produto 2",
          preco_unidade: 15.0,
        },
        quantidade: 1,
      },
    ];

    render(
      <Router>
        <CarrinhoProvider>
          <Carrinho value={{ produtosCarrinho }} />
        </CarrinhoProvider>
      </Router>
    );

    const linkProduto1 = screen.getByText("Produto 1");
    const linkProduto2 = screen.getByText("Produto 1");
    const precoProduto1 = screen.getByText("R$ 20");
    const precoProduto2 = screen.getByText("R$ 15");
    const precoTotal = screen.getByText("Preço total: R$ 35.00");

    expect(linkProduto1).toBeInTheDocument();
    expect(linkProduto2).toBeInTheDocument();
    expect(precoProduto1).toBeInTheDocument();
    expect(precoProduto2).toBeInTheDocument();
    expect(precoTotal).toBeInTheDocument();
  });
});
