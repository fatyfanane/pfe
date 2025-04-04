import React from 'react';
import './Transit.css';
import { FaGlobe, FaExchangeAlt, FaWarehouse } from 'react-icons/fa';

const Transit = () => {
  return (
    <div className="transit-page">
      <section className="transit-header">
        <h1>Services de Transit</h1>
        <p>Nous assurons une gestion fluide de vos marchandises à travers les frontières et les douanes.</p>
      </section>

      <section className="transit-grid">
        <div className="transit-card">
          <FaGlobe className="transit-icon" />
          <h3>Transit International</h3>
          <p>Déclarations douanières, coordination portuaire et suivi en temps réel.</p>
        </div>
        <div className="transit-card">
          <FaExchangeAlt className="transit-icon" />
          <h3>Dédouanement</h3>
          <p>Accompagnement complet à l'import/export selon les réglementations locales.</p>
        </div>
        <div className="transit-card">
          <FaWarehouse className="transit-icon" />
          <h3>Entreposage sous douane</h3>
          <p>Solutions de stockage temporaire sécurisées et certifiées.</p>
        </div>
      </section>
    </div>
  );
};

export default Transit;