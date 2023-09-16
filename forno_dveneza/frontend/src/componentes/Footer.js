import React from "react";
import "./Footer";
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
    margin: "0 10px",
  };

  const footerSectionStyle = {
    backgroundColor: "#f1f1f1",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const footerTextDivStyle = {
    display: "flex",
    height: "60px",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "#bdb7b7",
    backgroundColor: "#f1f1f1",
    padding: "10px",
  };

  return (
    <footer className="bg-light text-center text-dark" style={footerStyle}>
      <div>
        {/* <section style={footerSectionStyle}>
          <div className="social-icons">
            <a
              className="btn btn-link text-dark social-icon"
              href="https://www.facebook.com/favelasummit"
              role="button"
            >
              <FaFacebookF style={socialIconStyle} />
            </a>

            <a
              className="btn btn-link text-dark social-icon"
              href="#!"
              role="button"
            >
              <FaTwitter style={socialIconStyle} />
            </a>

            <a
              className="btn btn-link text-dark social-icon"
              href="#!"
              role="button"
            >
              <FaGoogle style={socialIconStyle} />
            </a>

            <a
              className="btn btn-link text-dark social-icon"
              href="https://www.instagram.com/accounts/login/two_factor?next=%2F"
              role="button"
            >
              <FaInstagram style={socialIconStyle} />
            </a>

            <a
              className="btn btn-link text-dark social-icon"
              href="https://www.linkedin.com/company/favelasummit"
              role="button"
            >
              <FaLinkedinIn style={socialIconStyle} />
            </a>

            <a
              className="btn btn-link text-dark social-icon"
              href="https://github.com/annaberto/projeto-integrador-univesp"
              role="button"
            >
              <FaGithub style={socialIconStyle} />
            </a>
          </div>
        </section> */}
      </div>

      <div
        className="text-center text-dark p-3 footer-text"
        style={footerTextDivStyle}
      >
        <div style={{ marginBottom: "10px" }}>
          <p style={{ margin: -5 }}>© {new Date().getFullYear()}</p>
          <p style={{ margin: -5 }}>Forno D`Veneza</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
