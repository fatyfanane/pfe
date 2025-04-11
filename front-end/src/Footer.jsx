import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Bloc Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p><FaPhone /> +212 522 40 56 58</p>
          <p><FaEnvelope /> contact@karlatrans.com</p>
          <p><FaMapMarkerAlt /> 12 Rue du Port, Casablanca</p>
        </div>

        {/* Bloc Navigation */}
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Bloc Réseaux Sociaux */}
        <div className="footer-section">
  <h3>Suivez-nous</h3>
  <div className="social-icons">
    <a href="https://www.facebook.com/p/Karlatrans-100063962260739/" target="_blank" rel="noopener noreferrer">
      <FaFacebookF />
    </a>
    <a href="https://ma.linkedin.com/in/karla-trans-0749241a2" target="_blank" rel="noopener noreferrer">
      <FaLinkedinIn />
    </a>
    <a href="https://x.com/trans_karla/status/1347153033977876480" target="_blank" rel="noopener noreferrer">
      <FaTwitter />
    </a>
  </div>
</div>

      </div>

      {/* Bas de page */}
      <div className="footer-bottom">
        &copy; 2025 KARLA TRANS – Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;