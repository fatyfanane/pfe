import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import SidebarAdmin from './pages/SidebarAdmin'; // ✅ Import du sidebar
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // ✅ Pour bouton toggle

const AdminDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [montants, setMontants] = useState({});
  const [message, setMessage] = useState('');
  const [factureGeneree, setFactureGeneree] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/demandes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const enAttente = res.data.filter((d) => d.statut === 'en_attente');
        setDemandes(enAttente);
      } catch (err) {
        console.error(err);
        setMessage("❌ Erreur de chargement des demandes");
      }
    };
    fetchDemandes();
  }, [token]);

  const handleChangeMontant = (id, value) => {
    setMontants({ ...montants, [id]: value });
  };

  const validerDemande = async (id) => {
    const montant = montants[id];
    if (!montant || isNaN(montant)) {
      return setMessage("💬 Merci d'entrer un montant valide.");
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/api/demandes/${id}`,
        { statut: 'validée', montant },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Devis validé et facture générée !');
      setDemandes((prev) => prev.filter((d) => d._id !== id));
      setFactureGeneree(res.data.facture);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la validation.");
    }
  };

  const rejeterDemande = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/demandes/${id}`,
        { statut: 'refusée' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('❌ Demande rejetée avec succès.');
      setDemandes((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors du rejet de la demande.");
    }
  };

  const telechargerFacturePDF = () => {
    if (!factureGeneree) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Facture KARLA TRANS', 70, 20);
    doc.setFontSize(12);
    doc.text(`Nom du client : ${factureGeneree.nom}`, 20, 40);
    doc.text(`Origine : ${factureGeneree.origine || 'N/A'}`, 20, 50);
    doc.text(`Détails marchandise : ${factureGeneree.details_marchandise}`, 20, 60);
    doc.text(`Montant : ${factureGeneree.montant} MAD`, 20, 70);
    doc.text(`Destination : ${factureGeneree.destination}`, 20, 80);
    doc.text(`Transport : ${factureGeneree.mode_transport}`, 20, 90);
    doc.text(`Date d’émission : ${new Date(factureGeneree.date_emission).toLocaleString()}`, 20, 100);
    doc.text(`Référence : ${factureGeneree._id}`, 20, 110);
    doc.save(`facture_${factureGeneree._id}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 relative">
      {/* ✅ Bouton flottant pour ouvrir la sidebar */}
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

      <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Demandes de devis en attente</h2>

      {message && <div className="text-center mb-4 text-green-600 font-medium">{message}</div>}

      {demandes.length === 0 ? (
        <p className="text-center text-gray-500">Aucune demande en attente.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Origine</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Transport</th>
                <th className="p-3 text-left">Montant (MAD)</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande) => (
                <tr key={demande._id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{demande.nom}</td>
                  <td className="p-3">{demande.origine}</td>
                  <td className="p-3">{demande.destination}</td>
                  <td className="p-3">{demande.mode_transport}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      placeholder="ex: 5000"
                      className="border rounded px-2 py-1 w-28"
                      value={montants[demande._id] || ''}
                      onChange={(e) => handleChangeMontant(demande._id, e.target.value)}
                    />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => validerDemande(demande._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => rejeterDemande(demande._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {factureGeneree && (
        <div className="mt-6 bg-white shadow-lg border border-blue-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Facture générée</h3>
          <p><strong>Nom :</strong> {factureGeneree.nom}</p>
          <p><strong>Origine :</strong> {factureGeneree.origine || 'N/A'}</p>
          <p><strong>Détails marchandise :</strong> {factureGeneree.details_marchandise}</p>
          <p><strong>Montant :</strong> {factureGeneree.montant} MAD</p>
          <p><strong>Destination :</strong> {factureGeneree.destination}</p>
          <p><strong>Transport :</strong> {factureGeneree.mode_transport}</p>
          <p><strong>Date :</strong> {new Date(factureGeneree.date_emission).toLocaleString()}</p>

          <button
            onClick={telechargerFacturePDF}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Télécharger en PDF
          </button>

          <button
            onClick={() => setFactureGeneree(null)}
            className="mt-2 ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDemandes;
