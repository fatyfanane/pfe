import React from "react";

import './About.css';

const About = () => {
  // URLs des images fournies
  const images = [
    "https://www.ship-technology.com/wp-content/uploads/sites/8/2022/02/GettyImages-968819844-scaled.jpg",
    "https://prosertek.com/wp-content/uploads/ports-in-2030.jpg",
    "https://www.portseurope.com/wp-content/uploads/2023/10/Global-Ports-Russia.jpeg"
  ];

  return (
    <>
    


      <div className="image-gallery">
        {images.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Transport Maritime ${index + 1}`} 
            className="gallery-image"
          />
        ))}
      </div>

      {/* About Section */}
      <div className="about-section">
        <h1 className="about-title">À Propos de Karla Trans</h1>
        
        <div className="about-content">
          <p>
            Karla Trans est une entreprise leader dans le domaine du transport maritime et de la logistique. 
            Nous nous engageons à fournir des services de qualité pour garantir la sécurité et la rapidité 
            de vos expéditions à travers le monde.
          </p>
          
          <p>
            Depuis notre création, nous avons su développer des solutions logistiques innovantes et adaptées 
            aux besoins spécifiques de nos clients. Nous avons une expertise dans le transport de marchandises, 
            la gestion des flux logistiques, ainsi que les services portuaires.
          </p>
          
          <p>
            Notre mission est d'assurer des services de transport fiables et efficaces, 
            tout en garantissant un service client irréprochable.
          </p>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
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
  <h2>Informations de Contact</h2>
  <p>
    Email: <a href="mailto:contact@karlatrans.com">contact@karlatrans.com</a>
  </p>
  <p>
    Téléphone: <a href="tel:05224-05658">05224-05658</a>
  </p>
</div>

        </div>

        <div className="footer">
          <p>&copy; 2025 Karla Trans - Tous droits réservés.</p>
        </div>
      </div>
    </>
  );
};

export default About;
