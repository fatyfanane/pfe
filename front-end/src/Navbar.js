import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { User, LogIn, UserPlus } from 'lucide-react'; // 👈 Import des icônes
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="navbar-title">KARLA TRANS</span>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" end>Accueil</NavLink></li>
        <li><NavLink to="/about">À Propos</NavLink></li>
        <li><NavLink to="/secteursactivite">Secteurs</NavLink></li>
        <li><NavLink to="/logistique">Logistique</NavLink></li>

        <li className="dropdown">
          <NavLink to="/frets">Frets</NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/FretMaritime">Fret Maritime</NavLink></li>
            <li><NavLink to="/FretAerien">Fret Aérien</NavLink></li>
          </ul>
        </li>

        <li><NavLink to="/transit">Transit</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <div className="user-info" ref={dropdownRef}>
        {user ? (
          <div className="user-menu">
            <button className="user-toggle" onClick={toggleDropdown}>
                        <img
              src={user.avatar || '/default-avatar.png'}
              alt="avatar"
              className="navbar-avatar"
            />
            <span>{user.name}</span>

            </button>
            {menuOpen && (
              <ul className="user-dropdown">
                {user.role === 'admin' && (
                  <li onClick={() => navigate('/admin')}>Dashboard Admin</li>
                )}
                {user.role === 'client' && (
                  <li onClick={() => navigate('/client')}>Dashboard Client</li>
                )}
                <li onClick={() => navigate('/profil')}>Mon Profil</li>
                <li onClick={handleLogout}>Déconnexion</li>
              </ul>
            )}

          </div>
        ) : (
          location.pathname === '/login' ? (
            <button className="login-button" onClick={() => navigate('/register/client')}>
              <UserPlus size={18} /> S’inscrire
            </button>
          ) : (
            <button className="login-button" onClick={() => navigate('/login')}>
              <LogIn size={18} /> Connexion
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;