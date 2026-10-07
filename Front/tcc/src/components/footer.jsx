// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-principal">
      <div>
        <div className="footer-texto">
          © {new Date().getFullYear()} TCC FIEB. REFORMAS RESIDENCIAIS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;