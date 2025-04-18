import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const MesDevis = () => {
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [filtreNom, setFiltreNom] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/demandes', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDemandes(res.data);
        setFilteredDemandes(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des demandes :', err);
      }
    };

    fetchDemandes();
  }, [token]);

  useEffect(() => {
    if (isAdmin) {
      const results = demandes.filter((d) =>
        d.nom.toLowerCase().includes(filtreNom.toLowerCase())
      );
      setFilteredDemandes(results);
    } else {
      setFilteredDemandes(demandes);
    }
  }, [filtreNom, demandes, isAdmin]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 relative">
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

      {/* ✅ SidebarAdmin */}
      <SidebarAdmin
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        totalUsers={0}
        adminCount={0}
        clientCount={0}
        handleSelectRole={() => {}}
      />

      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">Mes Demandes de Devis</h2>

      {isAdmin && (
        <div className="mb-4 text-right">
          <input
            type="text"
            placeholder="🔍 Rechercher par nom..."
            className="border px-3 py-2 rounded shadow-sm w-64"
            value={filtreNom}
            onChange={(e) => setFiltreNom(e.target.value)}
          />
        </div>
      )}

      {filteredDemandes.length === 0 ? (
        <p className="text-center text-gray-500">Aucune demande trouvée.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Origine</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Transport</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.map((d) => (
                <tr key={d._id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{d.nom}</td>
                  <td className="p-3">{d.origine}</td>
                  <td className="p-3">{d.destination}</td>
                  <td className="p-3">{d.mode_transport}</td>
                  <td className="p-3 capitalize">{d.statut}</td>
                  <td className="p-3">{new Date(d.date_demande).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setSelectedDemande(d)}
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedDemande && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Détails de la demande</h3>
          <p><strong>Nom :</strong> {selectedDemande.nom}</p>
          <p><strong>Origine :</strong> {selectedDemande.origine}</p>
          <p><strong>Destination :</strong> {selectedDemande.destination}</p>
          <p><strong>Mode de transport :</strong> {selectedDemande.mode_transport}</p>
          <p><strong>Détails marchandise :</strong> {selectedDemande.details_marchandise}</p>
          <p><strong>Statut :</strong> {selectedDemande.statut}</p>
          <p><strong>Date :</strong> {new Date(selectedDemande.date_demande).toLocaleString()}</p>

          <button
            onClick={() => setSelectedDemande(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default MesDevis;
