import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profil.css';

const Profil = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div className="profil-wrapper">
        <div className="profil-card">
          <h2>Profil non disponible</h2>
          <p>Veuillez vous connecter pour accéder à votre profil.</p>
          <button className="edit-button" onClick={() => navigate('/login')}>
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profil-wrapper">
      <div className="profil-card">
        <img
          src={user.avatar || '/default-avatar.png'}
          alt="avatar"
          className="profil-avatar"
        />
        <h2>{user.name}</h2>
        <div className={`badge ${user.role.toLowerCase()}`}>{user.role}</div>
        <p className="bio">{user.bio}</p>

        <div className="profil-info">
          <p><strong>Email :</strong> {user.email}</p>
         
        </div>

        <div className="separator" />

      
        <button className="home-button" onClick={() => navigate('/')}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Profil;