import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">KARLA TRANS</div>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">A Propos</Link></li>
        <li><Link to="/secteursactivite">Secteur d'activité</Link></li>
        <li><Link to="/logistique">Logistique</Link></li>
        <li><Link to="/">Nos Frets</Link></li>
        <li><Link to="/">Transit</Link></li>
        <li><Link to="#services">Services</Link></li>
        <li><Link to="#contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
