import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const footerStyle = {
    position: "fixed",
    bottom: "0",
    left: 0,
    width: "100%",
  };

  const socialIconStyle = {
    fontSize: "24px",
    margin: "0 10px", // Espaçamento horizontal entre ícones
  };

  const footerSectionStyle = {
    backgroundColor: "#f1f1f1",
    height: "80px",
    display: "flex",
    justifyContent: "center", // Centraliza horizontalmente
    alignItems: "center", // Centraliza verticalmente
    marginTop: "5px",
  };

  const footerTextDivStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "10px",
  };

  return (
    <footer className="bg-light text-center text-dark" style={footerStyle}>
      <div style={{ marginTop: "5px" }}>
        <section style={footerSectionStyle}>
          <a
            className="btn btn-link text-dark"
            href="https://www.facebook.com/favelasummit"
            role="button"
          >
            <FaFacebookF style={socialIconStyle} />
          </a>

          <a className="btn btn-link text-dark" href="#!" role="button">
            <FaTwitter style={socialIconStyle} />
          </a>

          <a className="btn btn-link text-dark" href="#!" role="button">
            <FaGoogle style={socialIconStyle} />
          </a>

          <a
            className="btn btn-link text-dark"
            href="https://www.instagram.com/accounts/login/two_factor?next=%2F"
            role="button"
          >
            <FaInstagram style={socialIconStyle} />
          </a>

          <a
            className="btn btn-link text-dark"
            href="https://www.linkedin.com/company/favelasummit"
            role="button"
          >
            <FaLinkedinIn style={socialIconStyle} />
          </a>

          <a
            className="btn btn-link text-dark"
            href="https://github.com/annaberto/projeto-integrador-univesp"
            role="button"
          >
            <FaGithub style={socialIconStyle} />
          </a>
        </section>
      </div>

      <div className="text-center text-dark p-3" style={footerTextDivStyle}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()}</p>
        <p style={{ margin: 0 }}>Forno D`Veneza</p>
      </div>
    </footer>
  );
};

export default Footer;
