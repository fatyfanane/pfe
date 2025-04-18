import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterAsClient.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
    if (formData.password.length < 6) newErrors.password = 'Mot de passe trop court';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess("✅ Compte créé avec succès !");
      setFormData({ name: '', email: '', password: '', role: 'client' });

      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message;
      setServerError(msg.includes("exist") ? "Cet email est déjà utilisé." : "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container fade-in">
        <div className="logo-container">
          <img src="/logokarla.png" alt="Logo Karla Trans" className="register-logo" />
        </div>

        <h2>Créer un compte</h2>

        <form onSubmit={handleSubmit} className="form-center">
          <div className="form-group">
            <input
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              required
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              required
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              required
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {serverError && <p className="error-msg">{serverError}</p>}
          {success && <p className="success-msg">{success}</p>}

          <div className="form-group">
            <button type="submit" className="form-button">
              S’inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
