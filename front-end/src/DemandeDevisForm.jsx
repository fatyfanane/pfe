import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DemandeDevisForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    origine: '',
    destination: '',
    details_marchandise: '',
    mode_transport: ''
  });

  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData((prev) => ({
          ...prev,
          nom: res.data.name
        }));
      } catch (err) {
        console.error('Erreur récupération user :', err);
      }
    };

    if (token) fetchUserInfo();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/demandes', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Votre demande de devis a bien été envoyée ✅');
      setFormData({
        nom: formData.nom,
        origine: '',
        destination: '',
        details_marchandise: '',
        mode_transport: ''
      });
    } catch (err) {
      console.error(err);
      setMessage(`Erreur lors de l'envoi 😢 : ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-10 p-6">

      {/* ✅ Bouton flottant pour ouvrir/fermer le sidebar */}
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

      {/* ✅ Sidebar Admin */}
      <SidebarAdmin
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        totalUsers={0}
        adminCount={0}
        clientCount={0}
        handleSelectRole={() => {}}
      />

      <div className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Demande de Devis</h2>
        {message && <div className="mb-4 text-center text-green-600 font-semibold">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Origine</label>
            <input
              type="text"
              name="origine"
              value={formData.origine}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mode de transport</label>
            <select
              name="mode_transport"
              value={formData.mode_transport}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">-- Choisir --</option>
              <option value="maritime">Maritime</option>
              <option value="aérien">Aérien</option>
              <option value="routier">Routier</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Détails de la marchandise</label>
            <textarea
              name="details_marchandise"
              value={formData.details_marchandise}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemandeDevisForm;
