import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import SidebarAdmin from './pages/SidebarAdmin';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const MesFactures = () => {
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const loadLogo = async () => {
      const res = await fetch('/logokarla.png');
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoDataUrl(reader.result);
      };
      reader.readAsDataURL(blob);
    };

    loadLogo();
  }, []);

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/factures', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFactures(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des factures :', err);
      }
    };

    fetchFactures();
  }, [token]);

  const telechargerFacturePDF = (facture) => {
    const doc = new jsPDF();
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, 'PNG', 15, 10, 40, 20);
    }

    doc.setFontSize(18);
    doc.text('Facture KARLA TRANS', 70, 20);

    doc.setFontSize(12);
    let y = 40;
    doc.text(`Nom du client : ${facture.nom}`, 20, y += 10);
    doc.text(`Montant : ${facture.montant} MAD`, 20, y += 10);
    doc.text(`Origine : ${facture.origine || '—'}`, 20, y += 10);
    doc.text(`Destination : ${facture.destination}`, 20, y += 10);
    doc.text(`Transport : ${facture.mode_transport}`, 20, y += 10);
    doc.text(`Détails marchandise : ${facture.details_marchandise}`, 20, y += 10);
    doc.text(`Date émission : ${new Date(facture.date_emission).toLocaleString()}`, 20, y += 10);
    doc.text(`Référence : ${facture._id}`, 20, y += 10);

    doc.save(`facture_${facture._id}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 relative">
      {/* ✅ Bouton flottant pour ouvrir le sidebar */}
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

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        {isAdmin ? 'Toutes les Factures' : 'Mes Factures'}
      </h2>

      {factures.length === 0 ? (
        <p className="text-center text-gray-500">Aucune facture trouvée.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Montant</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((f) => (
                <tr key={f._id} className="border-b hover:bg-blue-50">
                  <td className="p-3">{f.nom}</td>
                  <td className="p-3">{f.montant}</td>
                  <td className="p-3 capitalize">{f.statut}</td>
                  <td className="p-3">{new Date(f.date_emission).toLocaleDateString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setSelectedFacture(f)}
                      className="text-blue-600 hover:underline"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => telechargerFacturePDF(f)}
                      className="text-red-600 hover:underline"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedFacture && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Détails de la facture</h3>
          <p><strong>Nom :</strong> {selectedFacture.nom}</p>
          <p><strong>Montant :</strong> {selectedFacture.montant} MAD</p>
          <p><strong>Origine :</strong> {selectedFacture.origine || '—'}</p>
          <p><strong>Destination :</strong> {selectedFacture.destination}</p>
          <p><strong>Transport :</strong> {selectedFacture.mode_transport}</p>
          <p><strong>Détails :</strong> {selectedFacture.details_marchandise}</p>
          <p><strong>Statut :</strong> {selectedFacture.statut}</p>
          <p><strong>Date :</strong> {new Date(selectedFacture.date_emission).toLocaleString()}</p>

          <button
            onClick={() => setSelectedFacture(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default MesFactures;
