import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/karla_trans_cover-removebg-preview.png" alt="Karla Trans Logo" />
        <span className="navbar-title">KARLA TRANS</span>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Accueil</NavLink></li>
        <li><NavLink to="/about">À Propos</NavLink></li>
        <li><NavLink to="/secteursactivite">Secteurs</NavLink></li>
        <li><NavLink to="/logistique">Logistique</NavLink></li>
        <li><NavLink to="/frets">Frets</NavLink></li>
        <li><NavLink to="/transit">Transit</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;