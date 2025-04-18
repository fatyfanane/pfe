// ✅ AdminDashboard.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { FaUsers, FaEnvelopeOpenText, FaChartLine, FaUserPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const listRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );
  
    const targets = document.querySelectorAll('.section-title, .card');
    targets.forEach(el => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [sidebarOpen]);

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const clientCount = users.filter((u) => u.role === 'client').length;

  const filteredUsers = users
    .filter((u) => !selectedRole || u.role === selectedRole)
    .filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const chartData = [
    { name: 'Admins', value: adminCount },
    { name: 'Clients', value: clientCount },
  ];

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setSidebarOpen(false);
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const exportPDF = () => {
    const pdf = new jsPDF();
    const fileName = selectedRole === 'admin' ? 'liste_des_admins.pdf' : selectedRole === 'client' ? 'liste_des_clients.pdf' : 'utilisateurs.pdf';
    const title = selectedRole === 'admin' ? 'Liste des Administrateurs' : selectedRole === 'client' ? 'Liste des Clients' : 'Liste des Utilisateurs';
    pdf.setFontSize(16);
    pdf.text(title, 14, 20);
    autoTable(pdf, {
      startY: 30,
      head: [['Nom', 'Email']],
      body: filteredUsers.map((user) => [user.name, user.email]),
      styles: { fontSize: 12 },
      headStyles: { fillColor: [2, 136, 209] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    pdf.save(fileName);
  };

  const exportExcel = () => {
    const data = filteredUsers.map((user) => ({ Nom: user.name, Email: user.email }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Utilisateurs');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const fileName = selectedRole === 'admin' ? 'liste_des_admins.xlsx' : selectedRole === 'client' ? 'liste_des_clients.xlsx' : 'utilisateurs.xlsx';
    saveAs(blob, fileName);
  };

  const printTable = () => {
    const titleText = selectedRole === 'admin' ? 'Liste des administrateurs' : selectedRole === 'client' ? 'Liste des clients' : 'Liste des utilisateurs';
    const tableHTML = document.querySelector('.user-table').outerHTML;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Impression</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 30px; }
            h3 { color: #1565c0; margin-bottom: 20px; font-size: 22px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 12px 15px; text-align: left; font-size: 15px; }
            th { background-color: #e3f2fd; color: #01579b; }
            tr:nth-child(even) { background-color: #f1f8ff; }
          </style>
        </head>
        <body>
          <h3>${titleText}</h3>
          ${tableHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="admin-dashboard-wrapper">
      <button 
  className="arrow-btn" 
  onClick={() => setSidebarOpen(!sidebarOpen)}
  style={{
    position: 'fixed',
    top: '150px',
    left: sidebarOpen ? '250px' : '0px',
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
<aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
  <h3>Statistiques</h3>
  <ul>
    <li onClick={() => handleSelectRole(null)}>👥 Total utilisateurs: {totalUsers}</li>
    <li onClick={() => handleSelectRole("admin")}>🛡️ Admins: {adminCount}</li>
    <li onClick={() => handleSelectRole("client")}>🧑‍💼 Clients: {clientCount}</li>
  </ul>

  <h3 style={{ marginTop: '30px' }}>Navigation</h3>
  <ul>
    <li onClick={() => navigate('/demande-devis')}>📬 Demandes devis</li>
    <li onClick={() => navigate('/mes-factures')}>🧾 Factures</li>
    <li onClick={() => navigate('/mes-expeditions')}>🚚 Créer expédition</li>
    <li onClick={() => navigate('/liste-expedition')}>📦 Etat expéditions</li>
    <li onClick={() => navigate('/suivi-expedition')}>📦 Suivi expéditions</li>
    <li onClick={() => navigate('/admin/demandes')}>📦 Gerer Devis</li>
    <li onClick={() => navigate('/mes-devis')}>📦 liste des devis</li>
  </ul>
</aside>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
      <div className="dashboard">
        <h2>Tableau de bord Administrateur 🛠️</h2>
        <p>Gérez les utilisateurs, les demandes et les données du système.</p>
        <div className="dashboard-stats">
          <div className="stat-card" onClick={() => setSelectedRole(null)}>
            <h3>Total Utilisateurs</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="stat-card" onClick={() => handleSelectRole("admin")}> <h3>Admins</h3> <p>{adminCount}</p> </div>
          <div className="stat-card" onClick={() => handleSelectRole("client")}> <h3>Clients</h3> <p>{clientCount}</p> </div>
        </div>
        <div style={{ marginTop: 50, maxWidth: 600, marginInline: 'auto' }}>
          <h3 style={{ marginBottom: 20, color: "#1976d2" }}>Répartition des rôles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0288d1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {selectedRole && (
          <div className="user-list-section" ref={listRef} id="user-table-section">
            <h3>Liste des utilisateurs : {selectedRole}</h3>
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou email"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="export-buttons">
              <button onClick={exportPDF}>📄 PDF</button>
              <button onClick={exportExcel}>📊 Excel</button>
              <button onClick={printTable}>🖨️ Imprimer</button>
              <button onClick={() => navigate('/register')}><FaUserPlus style={{ marginRight: 6 }} />Créer un utilisateur</button>
            </div>
            <table className="user-table">
              <thead>
                <tr><th>Nom</th><th>Email</th></tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}><td>{user.name}</td><td>{user.email}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/userlist')}>
            <FaUsers size={28} color="#0277bd" style={{ marginBottom: 10 }} />
            <h3>Gestion des utilisateurs</h3>
            <p>Voir la liste, changer les rôles ou supprimer.</p>
          </div>
          <div className="card">
            <FaEnvelopeOpenText size={28} color="#0277bd" style={{ marginBottom: 10 }} />
            <h3>Demandes en attente</h3>
            <p>Consultez les dernières demandes de clients.</p>
          </div>
          <div className="card">
            <FaChartLine size={28} color="#0277bd" style={{ marginBottom: 10 }} />
            <h3>Statistiques</h3>
            <p>Visualisez les données globales (expéditions, activité...)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
