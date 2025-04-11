import React, { useEffect, useRef, useState } from "react";
import "./TransportMaritime.css";
import { FaShip, FaGlobe, FaClock } from "react-icons/fa";

const TransportMaritime = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="transport-page">
      {/* HERO SECTION - Nouveau Design Animé */}
      <div className="transport-hero">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <img
            src="/logokarla.png"
            alt="Karla Trans Logo"
            className="hero-logo-large"
          />
          <div className="hero-text">
            <h1>Transport Maritime International</h1>
            <p>
              Connectez vos marchandises au monde entier avec rapidité, sécurité et fiabilité.
            </p>
            <button className="hero-button" onClick={handleClick}>Demander un devis</button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="transport-description">
        <h2>Notre Expertise Maritime</h2>
        <p>
          Chez <strong>Karla Trans</strong>, nous assurons un service de transport maritime global pour tout type de marchandises.
        </p>
        <p>
          Nous collaborons avec un réseau mondial de partenaires pour garantir ponctualité, sécurité et traçabilité.
        </p>
      </section>

      {/* AVANTAGES */}
      <section className="transport-avantages">
        <h2>Pourquoi choisir Karla Trans ?</h2>
        <div className="features">
          <div className="feature">
            <FaShip className="icon" />
            <h3>Réseau Mondial</h3>
            <p>Partenaires fiables dans tous les ports stratégiques du monde.</p>
          </div>
          <div className="feature">
            <FaGlobe className="icon" />
            <h3>Suivi Global</h3>
            <p>Traçabilité en temps réel via notre plateforme dédiée.</p>
          </div>
          <div className="feature">
            <FaClock className="icon" />
            <h3>Délais Optimisés</h3>
            <p>Délais de transit compétitifs et engagement de ponctualité.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="transport-cta">
        <h2>Besoin d’un devis maritime ?</h2>
        <button className="cta-button" onClick={handleClick}>Demander un devis</button>
      </div>

      {showForm && (
        <section className="transport-form" ref={formRef}>
          <div className="form-wrapper">
            <div className="form-image" />
            <div className="form-content">
              <h2>Demande de devis personnalisé</h2>
              <p>Remplissez ce formulaire pour recevoir une estimation rapide et gratuite.</p>
              <form className="quote-form">
                <input type="text" placeholder="Nom complet" required />
                <input type="email" placeholder="Adresse e-mail" required />
                <input type="text" placeholder="Type de marchandise" required />
                <input type="text" placeholder="Port de départ" required />
                <input type="text" placeholder="Port de destination" required />
                <textarea placeholder="Détails supplémentaires..." rows="4"></textarea>
                <button type="submit">Envoyer la demande</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TransportMaritime;