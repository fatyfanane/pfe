import React from 'react';
import './logistique.css';

const Logistique = () => {
  return (
    <div className="logistique-container">
      <header>
        <h1>Services Logistiques</h1>
        <p>Optimisez votre chaîne d'approvisionnement avec nos services de gestion logistique.</p>
      </header>

      <section className="services">
        <h2>Nos Services</h2>
        <div className="service-item">
          <h3>Entreposage</h3>
          <p>Stockage de vos produits dans nos entrepôts sous douane et zones industrielles.</p>
        </div>
        <div className="service-item">
          <h3>Distribution</h3>
          <p>Gestion de la distribution et livraison à destination finale.</p>
        </div>
        <div className="service-item">
          <h3>Traçabilité</h3>
          <p>Suivi en temps réel de vos marchandises via notre plateforme dédiée.</p>
        </div>
      </section>

      <section className="cta">
        <p>Contactez-nous pour une solution logistique sur mesure.</p>
        <button>Demander un devis</button>
      </section>
    </div>
  );
};

export default Logistique;