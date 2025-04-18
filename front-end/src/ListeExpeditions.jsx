import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ListeExpeditions = () => {
  const [expeditions, setExpeditions] = useState([]);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expeditions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpeditions(res.data);
      } catch (err) {
        console.error('Erreur chargement expéditions', err);
      }
    };

    fetchExpeditions();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/expeditions/${id}`,
        { statut: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExpeditions((prev) =>
        prev.map((e) => (e._id === id ? { ...e, statut: newStatus } : e))
      );
      setMessage('✅ Statut mis à jour avec succès.');
    } catch (err) {
      console.error('Erreur mise à jour statut', err);
      setMessage("❌ Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 relative">
      {/* ✅ Bouton flottant pour sidebar */}
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

      <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Liste des Expéditions</h2>

      {message && <div className="text-center mb-4 text-green-600 font-medium">{message}</div>}

      {expeditions.length === 0 ? (
        <p className="text-center text-gray-500">Aucune expédition trouvée.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                {isAdmin && <th className="p-3 text-left">Client</th>}
                <th className="p-3 text-left">Origine</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Marchandise</th>
                <th className="p-3 text-left">Transport</th>
                <th className="p-3 text-left">Code de Suivi</th>
                <th className="p-3 text-left">Date</th>
                {isAdmin && <th className="p-3 text-left">Statut</th>}
                {isAdmin && <th className="p-3 text-left">Action</th>}
              </tr>
            </thead>
            <tbody>
              {expeditions.map((e) => (
                <tr key={e._id} className="border-b hover:bg-blue-50">
                  {isAdmin && <td className="p-3">{e.client_id?.name || '—'}</td>}
                  <td className="p-3">{e.origine}</td>
                  <td className="p-3">{e.destination}</td>
                  <td className="p-3">{e.details_marchandise}</td>
                  <td className="p-3">{e.mode_transport}</td>
                  <td className="p-3">{e.code_suivi}</td>
                  <td className="p-3">{new Date(e.date_expedition).toLocaleDateString()}</td>
                  {isAdmin && <td className="p-3 capitalize">{e.statut}</td>}
                  {isAdmin && (
                    <td className="p-3">
                      <select
                        className="border rounded px-2 py-1"
                        value={e.statut}
                        onChange={(eChange) =>
                          handleStatusChange(e._id, eChange.target.value)
                        }
                      >
                        <option value="préparée">Préparée</option>
                        <option value="en_cours">En cours</option>
                        <option value="livrée">Livrée</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-right mt-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = '/suivi-expedition'}
        >
          Suivre une expédition
        </button>
      </div>
    </div>
  );
};

export default ListeExpeditions;
