// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "green",
        color: "blue",
        padding: "18px 0",
        marginTop: "10px",
        fontSize: "10px",
        textAlign: "center"
      }}
    >
      <div>

        {/* MENU 
        <nav style={{ marginBottom: "2px" }}>
          <Link
            to="/Cadastro"
            style={{
              color: "blue",
              textDecoration: "none",
              fontSize: "15px",
              marginRight: "15px"
            }}
          >
            Cadastre - se
          </Link>
        </nav>*/}

        {/* TEXTO */}
        <div style={{ fontSize: "10px", color: "white" }}>
          © {new Date().getFullYear()} TCC FIEB. REFORMAS RESIDENCIAIS.
        </div>

      </div>
    </footer>
  );
};

export default Footer;