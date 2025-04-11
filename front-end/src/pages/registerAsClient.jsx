import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react';
import './RegisterAsClient.css';

const RegisterAsClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError('');
    try {
      const dataToSend = { ...formData, role: 'client' };
      await axios.post('http://localhost:5000/api/auth/register', dataToSend);
      setSuccessMessage('✅ Inscription réussie ! Redirection...');
      setFormData({ name: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err.response?.status === 400) {
        setServerError("❌ Cet email est déjà utilisé.");
      } else {
        setServerError("❌ Erreur inattendue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container fade-in">
        <div className="logo-container">
          <img src="/logokarla.png" alt="Logo Karla Trans" className="register-logo" />
        </div>
        <h2>Créer un compte client</h2>

        <form onSubmit={handleSubmit} className="form-center">
          {/* Nom */}
          <div className="form-group">
            <div className="input-icon">
              <User className="input-icon-left" size={20} />
              <input
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleChange}
                required
                className={`form-input ${errors.name ? 'input-error' : ''}`}
              />
            </div>
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-icon">
              <Mail className="input-icon-left" size={20} />
              <input
                name="email"
                type="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
            </div>
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <div className="input-icon">
              <Lock className="input-icon-left" size={20} />
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
            </div>
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          {/* Messages */}
          {serverError && <div className="form-group"><p className="error-msg">{serverError}</p></div>}
          {successMessage && <div className="form-group"><p className="success-msg">{successMessage}</p></div>}

          {/* Bouton */}
          <div className="form-group">
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? <div className="spinner"></div> : "S’inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsClient;