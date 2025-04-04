import React from 'react';
import './Services.css';
import { FaShip, FaBoxes, FaAnchor, FaTruck } from 'react-icons/fa';

const Services = () => {
  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Nos Services</h1>
        <p>Une offre complète et personnalisée pour répondre à tous vos besoins logistiques et portuaires.</p>
      </header>

      <section className="services-grid">
        <div className="service-box">
          <FaShip className="icon" />
          <h3>Transport Maritime</h3>
          <p>Fret complet ou groupé avec un réseau d'armateurs internationaux.</p>
        </div>
        <div className="service-box">
          <FaTruck className="icon" />
          <h3>Transport Routier</h3>
          <p>Distribution nationale et transfrontalière en temps réel.</p>
        </div>
        <div className="service-box">
          <FaBoxes className="icon" />
          <h3>Logistique Intégrée</h3>
          <p>Gestion des stocks, entreposage et flux logistiques optimisés.</p>
        </div>
        <div className="service-box">
          <FaAnchor className="icon" />
          <h3>Services Portuaires</h3>
          <p>Manutention, formalités douanières et opérations portuaires spécialisées.</p>
        </div>
      </section>
    </div>
  );
};

export default Services;