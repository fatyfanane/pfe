import React from 'react';
import './Frets.css';
import { FaShip, FaPlane, FaTruck } from 'react-icons/fa';

const Frets = () => {
  return (
    <div className="frets-container">
      <header className="frets-header">
        <h1>Nos Solutions de Fret</h1>
        <p>Nous offrons une gamme complète de solutions de fret adaptées à vos besoins logistiques.</p>
      </header>

      <section className="frets-types">
        <div className="fret-card">
          <FaShip className="fret-icon" />
          <h3>Fret Maritime</h3>
          <p>Transport par voie maritime pour les marchandises volumineuses et les longues distances internationales.</p>
        </div>
        <div className="fret-card">
          <FaPlane className="fret-icon" />
          <h3>Fret Aérien</h3>
          <p>Livraison rapide à l’international pour vos envois urgents et sensibles.</p>
        </div>
        <div className="fret-card">
          <FaTruck className="fret-icon" />
          <h3>Fret Routier</h3>
          <p>Transport terrestre efficace pour la distribution nationale et régionale.</p>
        </div>
      </section>

      <section className="frets-cta">
        <p>Besoin d’un accompagnement personnalisé pour votre fret ?</p>
        <button className="cta-button">Contactez nos experts</button>
      </section>
    </div>
  );
};

export default Frets;