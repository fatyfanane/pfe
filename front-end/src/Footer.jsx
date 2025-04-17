import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <div className="footer-logo-container">
            <img src="/logokarla.png" alt="Karla Trans Logo" className="footer-logo-img" />
          </div>
          <div className="footer-slogan">
            <h3>Karla Trans</h3>
            <p>Excellence logistique et maritime</p>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="#about">À propos</a></li>
              <li><a href="#valeurs">Nos valeurs</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Transport maritime</li>
              <li>Logistique intégrée</li>
              <li>Services portuaires</li>
              <li>Solutions d'entreposage</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Suivez-nous</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/p/Karlatrans-100063962260739/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://ma.linkedin.com/in/karla-trans-0749241a2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://x.com/trans_karla/status/1347153033977876480" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Karla Trans. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;