import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const SidebarAdmin = ({ sidebarOpen, setSidebarOpen, totalUsers, adminCount, clientCount, handleSelectRole }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {isAdmin && (
      <h3>Statistiques</h3>
    )}
      {isAdmin && (
      <ul>
     
        <li onClick={() => handleSelectRole(null)}>👥 Total utilisateurs: {totalUsers}</li>
        <li onClick={() => handleSelectRole('admin')}>🛡️ Admins: {adminCount}</li>
        <li onClick={() => handleSelectRole('client')}>🧑‍💼 Clients: {clientCount}</li>
        
      </ul>
       )}

      <h3 style={{ marginTop: '30px' }}>Navigation</h3>
      <ul>
        <li onClick={() => navigate('/demande-devis')}>📬 Demandes devis</li>
        <li onClick={() => navigate('/mes-factures')}>🧾 Factures</li>

        {isAdmin && (
          <li onClick={() => navigate('/mes-expeditions')}>🚚 Créer expédition</li>
        )}

        <li onClick={() => navigate('/liste-expedition')}>📦 Etat expéditions</li>
        <li onClick={() => navigate('/suivi-expedition')}>📦 Suivi expéditions</li>

        {isAdmin && (
          <li onClick={() => navigate('/admin/demandes')}>📦 Gérer Devis</li>
        )}

        <li onClick={() => navigate('/mes-devis')}>📦 Liste des devis</li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
