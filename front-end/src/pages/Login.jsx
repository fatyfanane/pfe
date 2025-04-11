import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Service pour la connexion
import './RegisterAsClient.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData); // Appel à l'API de connexion
      const { name, role, email, avatar } = res.user || res; // Récupère l'email, le nom, et autres infos

      // Stocke dans localStorage les informations de l'utilisateur
      localStorage.setItem('user', JSON.stringify({ name, role, email, avatar }));

      // Redirection selon le rôle
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container fade-in">
        <div className="logo-container">
          <img src="/logokarla.png" alt="Logo Karla Trans" className="register-logo" />
        </div>

        <h2>Connexion à Karla Trans</h2>

        <form onSubmit={handleSubmit} className="form-center">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {error && (
            <div className="form-group">
              <p className="error-msg">{error}</p>
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="form-button">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;