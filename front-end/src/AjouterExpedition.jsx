import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AjouterExpedition = () => {
  const [demandesValidees, setDemandesValidees] = useState([]);
  const [expeditionsExistantes, setExpeditionsExistantes] = useState([]);
  const [message, setMessage] = useState('');
  const [expeditionGeneree, setExpeditionGeneree] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDemandes, resExpeditions] = await Promise.all([
          axios.get('http://localhost:5000/api/demandes', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/expeditions', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const demandesValidees = resDemandes.data.filter((d) => d.statut === 'validée');
        const idsExpediees = resExpeditions.data.map((e) => e.demande_devis_id?._id || e.demande_devis_id);

        setDemandesValidees(demandesValidees);
        setExpeditionsExistantes(idsExpediees);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  const creerExpedition = async (demande) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/expeditions',
        { demande_devis_id: demande._id, origine: demande.origine },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Expédition créée avec succès !');
      setExpeditionGeneree({ ...res.data, demande });
      setExpeditionsExistantes((prev) => [...prev, demande._id]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la création de l'expédition.");
    }
  };

  const telechargerPDF = () => {
    if (!expeditionGeneree) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Expédition KARLA TRANS', 60, 20);
    doc.setFontSize(12);
    doc.text(`Nom client : ${expeditionGeneree.demande.nom}`, 20, 40);
    doc.text(`Origine : ${expeditionGeneree.origine}`, 20, 50);
    doc.text(`Destination : ${expeditionGeneree.destination}`, 20, 60);
    doc.text(`Marchandise : ${expeditionGeneree.details_marchandise}`, 20, 70);
    doc.text(`Transport : ${expeditionGeneree.mode_transport}`, 20, 80);
    doc.text(`Date : ${new Date(expeditionGeneree.date_expedition).toLocaleString()}`, 20, 90);
    doc.text(`Code de suivi : ${expeditionGeneree.code_suivi}`, 20, 100);
    doc.save(`expedition_${expeditionGeneree._id}.pdf`);
  };

  return (
    <div className="relative max-w-6xl mx-auto mt-10 p-4">
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

      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Demandes Validées</h2>

      {message && <div className="text-center text-green-600 font-medium mb-4">{message}</div>}

      {demandesValidees.length === 0 ? (
        <p className="text-center text-gray-500">Aucune demande validée disponible.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Origine</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Marchandise</th>
                <th className="p-3 text-left">Transport</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {demandesValidees.map((d) => {
                const dejaCreee = expeditionsExistantes.includes(d._id);
                return (
                  <tr key={d._id} className="border-b hover:bg-blue-50">
                    <td className="p-3">{d.nom}</td>
                    <td className="p-3">{d.origine}</td>
                    <td className="p-3">{d.destination}</td>
                    <td className="p-3">{d.details_marchandise}</td>
                    <td className="p-3">{d.mode_transport}</td>
                    <td className="p-3">
                      {!dejaCreee ? (
                        <button
                          onClick={() => creerExpedition(d)}
                          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
                        >
                          Créer l’expédition
                        </button>
                      ) : (
                        <span className="text-gray-500 italic">Déjà créée</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {expeditionGeneree && (
        <div className="mt-8 bg-white border border-blue-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Expédition créée</h3>
          <p><strong>Client :</strong> {expeditionGeneree.demande.nom}</p>
          <p><strong>Origine :</strong> {expeditionGeneree.origine}</p>
          <p><strong>Destination :</strong> {expeditionGeneree.destination}</p>
          <p><strong>Transport :</strong> {expeditionGeneree.mode_transport}</p>
          <p><strong>Marchandise :</strong> {expeditionGeneree.details_marchandise}</p>
          <p><strong>Code de suivi :</strong> {expeditionGeneree.code_suivi}</p>

          <button
            onClick={telechargerPDF}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Télécharger le PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default AjouterExpedition;
