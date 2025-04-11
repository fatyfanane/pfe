import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Exemple de données à afficher (remplacer par des appels d'API si nécessaire)
const mockData = {
  demandes: 12,
  expeditions: 5,
  informationsMisesAJour: false,
};

const ClientDashboard = () => {
  // Etape 1: Définir des états pour les informations dynamiques (comme les demandes et expéditions)
  const [data, setData] = useState(mockData);

  // Simulation d'une mise à jour des données (utilisation d'un useEffect)
  useEffect(() => {
    // Cette fonction pourrait récupérer les données à partir d'une API
    const timer = setTimeout(() => {
      setData({
        demandes: 15, // Nombre de demandes
        expeditions: 3, // Nombre d'expéditions
        informationsMisesAJour: true, // Indication que l'utilisateur a mis à jour ses informations
      });
    }, 3000); // Simuler un changement après 3 secondes

    return () => clearTimeout(timer); // Nettoyer l'effet
  }, []);

  return (
    <div className="dashboard">
      <h2>Bienvenue sur votre espace client 👤</h2>
      <p>Vous pouvez ici consulter vos services, faire des demandes, et suivre vos expéditions.</p>

      {/* Section des cartes */}
      <div className="dashboard-cards">
        <div className="card">
          <i className="fas fa-clipboard-list card-icon"></i> {/* Icône pour les demandes */}
          <h3>Mes demandes</h3>
          <p>Suivi de vos demandes de transport ou devis.</p>
          <span className="card-info">{data.demandes} demandes en cours</span>
        </div>
        <div className="card">
          <i className="fas fa-truck card-icon"></i> {/* Icône pour les expéditions */}
          <h3>Expéditions</h3>
          <p>Consultez l’état de vos expéditions en temps réel.</p>
          <span className="card-info">{data.expeditions} expéditions en cours</span>
        </div>
        <div className="card">
          <i className={`fas fa-user-edit card-icon ${data.informationsMisesAJour ? 'updated' : ''}`}></i> {/* Icône pour les informations */}
          <h3>Mes informations</h3>
          <p>Mettez à jour votre profil et vos coordonnées.</p>
          <span className="card-info">
            {data.informationsMisesAJour ? 'Informations à jour' : 'Mettre à jour vos informations'}
          </span>
        </div>
      </div>

      {/* Footer avec liens utiles */}
      <footer className="dashboard-footer">
        <p>Besoin d’aide ? <a href="/support">Contactez le support</a></p>
        <p><a href="/faq">FAQ</a> | <a href="/terms">Conditions générales</a></p>
      </footer>
    </div>
  );
};

export default ClientDashboard;
