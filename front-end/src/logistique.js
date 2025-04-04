import React from 'react';
import './logistique.css';
import { FaWarehouse, FaTruckLoading, FaSearchLocation } from 'react-icons/fa';

const Logistique = () => {
  return (
    <div className="logistique-container">
      <header className="logistique-header">
        <h1>Services Logistiques</h1>
        <p>Optimisez votre chaîne d'approvisionnement avec des solutions flexibles, efficaces et sécurisées.</p>
      </header>

      <section className="logistique-services">
        <h2>Nos Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <FaWarehouse className="service-icon" />
            <h3>Entreposage</h3>
            <p>Stockage sécurisé dans nos entrepôts sous douane et zones industrielles.</p>
          </div>
          <div className="service-card">
            <FaTruckLoading className="service-icon" />
            <h3>Distribution</h3>
            <p>Gestion de la distribution nationale et internationale, avec livraison à la destination finale.</p>
          </div>
          <div className="service-card">
            <FaSearchLocation className="service-icon" />
            <h3>Traçabilité</h3>
            <p>Suivi en temps réel des marchandises via notre plateforme digitale dédiée.</p>
          </div>
        </div>
      </section>

      <section className="logistique-cta">
        <p>Besoin d’une solution sur mesure ? Notre équipe est à votre écoute.</p>
        <button className="cta-button">Demander un devis</button>
      </section>
    </div>
  );
};

export default Logistique;