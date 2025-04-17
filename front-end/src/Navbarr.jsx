import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPhone } from "react-icons/fa"; // Importer l'icône de téléphone
import "./Navbarr.css";

const Navbarr = () => {
  return (
    <nav className="navbar-blue">
      <div className="navbar-left">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
      <div className="navbar-center">
        <p>"La logistique n’est pas un coût, c’est un avantage compétitif."</p>
      </div>
      <div className="navbar-right">
        <FaPhone className="phone-icon" /> {/* Icône de téléphone */}
        <a href="tel:+212522405658">
          <span>+212 522 40 56 58</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbarr;