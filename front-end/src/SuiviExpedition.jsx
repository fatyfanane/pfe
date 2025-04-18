import React, { useState } from 'react';
import axios from 'axios';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SuiviExpedition = () => {
  const [code, setCode] = useState('');
  const [expedition, setExpedition] = useState(null);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/expeditions/suivi/${code}`);
      setExpedition(res.data);
      setError('');
    } catch (err) {
      setError('❌ Aucune expédition trouvée avec ce code.');
      setExpedition(null);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6">
      {/* ✅ Bouton pour ouvrir le sidebar */}
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

      {/* ✅ Sidebar admin */}
      <SidebarAdmin
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        totalUsers={0}
        adminCount={0}
        clientCount={0}
        handleSelectRole={() => {}}
      />

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Suivi d’Expédition</h2>

        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Entrez votre code de suivi"
            className="flex-1 border rounded p-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Rechercher
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {expedition && (
          <div className="mt-6 space-y-2 border-t pt-4">
            <p><strong>Nom client :</strong> {expedition.client_id?.name}</p>
            <p><strong>Origine :</strong> {expedition.origine}</p>
            <p><strong>Destination :</strong> {expedition.destination}</p>
            <p><strong>Détails :</strong> {expedition.details_marchandise}</p>
            <p><strong>Mode :</strong> {expedition.mode_transport}</p>
            <p><strong>Statut :</strong> {expedition.statut}</p>
            <p><strong>Date :</strong> {new Date(expedition.date_expedition).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuiviExpedition;
