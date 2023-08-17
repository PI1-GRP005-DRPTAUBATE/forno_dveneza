import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("Renderizando os icones corretamente", () => {
    render(<Footer />);

    const facebookIcon = screen.getByLabelText("Facebook");
    const twitterIcon = screen.getByLabelText("Twitter");
    const googleIcon = screen.getByLabelText("Google");
    const instagramIcon = screen.getByLabelText("Instagram");
    const linkedinIcon = screen.getByLabelText("LinkedIn");
    const githubIcon = screen.getByLabelText("GitHub");

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(googleIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
  });

  it("Renderizando a empresa e copy right corretamente", () => {
    render(<Footer />);

    const copyrightText = screen.getByText(`© ${new Date().getFullYear()}`);
    const companyNameText = screen.getByText("Forno D`Veneza");

    expect(copyrightText).toBeInTheDocument();
    expect(companyNameText).toBeInTheDocument();
  });
});
