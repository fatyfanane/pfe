import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs :', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/role, { role: newRole }`);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors du changement de rôle :", err);
    }
  };

  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Liste des utilisateurs", 14, 20);

    autoTable(pdf, {
      startY: 30,
      head: [['Nom', 'Email', 'Rôle']],
      body: users.map((u) => [u.name, u.email, u.role]),
      styles: { fontSize: 12 },
      headStyles: { fillColor: [2, 136, 209] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    pdf.save('liste_utilisateurs.pdf');
  };

  const exportExcel = () => {
    const data = users.map((user) => ({
      Nom: user.name,
      Email: user.email,
      Rôle: user.role,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Utilisateurs');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'utilisateurs.xlsx');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Liste des utilisateurs</h2>
        <div className="user-actions">
          <button onClick={exportPDF}>📄 PDF</button>
          <button onClick={exportExcel}>📊 Excel</button>
          <button onClick={() => navigate('/register')}>➕ Créer un utilisateur</button>
        </div>
      </div>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)} className="delete-button">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;