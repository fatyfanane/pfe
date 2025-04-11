import React, { useEffect, useRef, useState } from "react";
import "./logistique.css";
import { FaWarehouse, FaSnowflake, FaTruckMoving, FaGlobe } from "react-icons/fa";

const Logistique = () => {
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
    <div className="logistique-page">
      {/* HERO SECTION */}
      <div className="logistique-heroo">
        <div className="heroo-overlay"></div>
        <div className="heroo-container">
          <img
            src="/logokarla.png"
            alt="Karla Logistique Logo"
            className="hero-logo-large"
          />
          <div className="heroo-text">
            <h1>Solutions Logistiques Sur-Mesure</h1>
            <p>
              Optimisez votre chaîne d'approvisionnement avec nos services logistiques intégrés.
            </p>
            <button className="hero-button" onClick={handleClick}>Obtenir un devis</button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="logistique-description">
        <h2>Notre Expertise</h2>
        <p>
          Chez <strong>Karla Logistique</strong>, nous offrons des solutions personnalisées pour répondre aux besoins spécifiques de chaque client en matière de stockage et de transport.
        </p>
        <p>
          Notre équipe expérimentée assure une gestion efficace et sécurisée de vos marchandises, avec une attention particulière portée à la qualité du service.
        </p>
      </section>

      {/* SERVICES */}
      <section className="logistique-services">
        <h2>Nos Services</h2>
        <div className="services">
          <div className="service">
            <FaWarehouse className="icon" />
            <h3>Stockage à Sec</h3>
            <p>Entreposage sécurisé pour tous types de marchandises non périssables.</p>
          </div>
          <div className="service">
            <FaSnowflake className="icon" />
            <h3>Stockage Réfrigéré</h3>
            <p>Installations à température contrôlée pour produits sensibles.</p>
          </div>
          <div className="service">
            <FaTruckMoving className="icon" />
            <h3>Transport National</h3>
            <p>Distribution rapide et fiable sur l'ensemble du territoire.</p>
          </div>
          <div className="service">
            <FaGlobe className="icon" />
            <h3>Transport International</h3>
            <p>Solutions d'expédition mondiales adaptées à vos besoins.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="logistique-cta">
        <h2>Prêt à optimiser votre logistique ?</h2>
        <button className="cta-button" onClick={handleClick}>Contactez-nous</button>
      </div>

      {showForm && (
        <section className="logistique-form" ref={formRef}>
          <div className="form-wrapper">
            <div className="form-image" />
            <div className="form-content">
              <h2>Demande de Devis</h2>
              <p>Remplissez le formulaire ci-dessous pour recevoir une proposition personnalisée.</p>
              <form className="quote-form">
                <input type="text" placeholder="Nom complet" required />
                <input type="email" placeholder="Adresse e-mail" required />
                <input type="text" placeholder="Entreprise" required />
                <input type="text" placeholder="Service souhaité" required />
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

export default Logistique;