import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Dashboard.css';

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  return (
    <div className="relative max-w-7xl mx-auto mt-10 p-4">

      {/* ✅ Bouton flottant */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          top: 150,
          left: sidebarOpen ? 250 : 0,
          backgroundColor: '#0288d1',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '0 8px 8px 0',
          zIndex: 1000,
          transition: 'left 0.3s'
        }}
      >
        {sidebarOpen ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
      </button>

      {/* ✅ Sidebar */}
      <SidebarAdmin
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        totalUsers={0}
        adminCount={0}
        clientCount={0}
        handleSelectRole={() => {}}
      />

      <div className="dashboard">
        <h2>Bienvenue sur votre espace client 👤</h2>
        <p>Vous pouvez ici consulter vos services, faire des demandes, et suivre vos expéditions.</p>

        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/mes-devis')}>
            <h3>Mes demandes</h3>
            <p>Suivi de vos demandes de transport ou devis.</p>
          </div>
          <div className="card" onClick={() => navigate('/liste-expedition')}>
            <h3>Expéditions</h3>
            <p>Consultez l’état de vos expéditions en temps réel.</p>
          </div>
          <div className="card" onClick={() => navigate('/profil')}>
            <h3>Mes informations</h3>
            <p>Mettez à jour votre profil et vos coordonnées.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
