import React from "react";
import './About.css';

const images = [
  "https://www.ship-technology.com/wp-content/uploads/sites/8/2022/02/GettyImages-968819844-scaled.jpg",
  "https://prosertek.com/wp-content/uploads/ports-in-2030.jpg",
  "https://www.portseurope.com/wp-content/uploads/2023/10/Global-Ports-Russia.jpeg"
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero & Gallery */}
      <section className="about-hero">
        <h1>Karla Trans</h1>
        <p>Excellence logistique et maritime au service de votre performance</p>
      </section>

      <section className="image-gallery">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Illustration ${i + 1}`} className="gallery-image" />
        ))}
      </section>

      {/* Texte à propos */}
      <section className="about-content">
        <h2>À propos de nous</h2>
        <p>
          Karla Trans est un acteur incontournable du transport maritime, de la logistique intégrée
          et des services portuaires. Notre priorité : vous proposer des solutions innovantes, sécurisées
          et sur mesure pour optimiser vos chaînes logistiques.
        </p>
        <p>
          Grâce à une équipe d'experts et un réseau mondial, nous accompagnons nos clients dans leurs
          projets d'import/export, de stockage et de distribution.
        </p>
        <p>
          Notre mission est de simplifier la complexité du transport international avec des services fiables,
          traçables et orientés client.
        </p>
      </section>

      {/* Contact + Infos */}
      <section className="about-contact">
        <div className="contact-form">
          <h2>Contactez-nous</h2>
          <form>
            <input type="text" placeholder="Votre nom" required />
            <input type="email" placeholder="Votre email" required />
            <textarea placeholder="Votre message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Informations</h2>
          <p>Email : <a href="mailto:contact@karlatrans.com">contact@karlatrans.com</a></p>
          <p>Téléphone : <a href="tel:+212522405658">+212 522 40 56 58</a></p>
          <p>Adresse : 12 Rue du Port, Casablanca, Maroc</p>
        </div>
      </section>

     
    </div>
  );
};

export default About;