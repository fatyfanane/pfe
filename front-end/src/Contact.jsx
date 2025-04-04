import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contactez Karla Trans</h1>
        <p>Nous sommes à votre écoute pour toute demande de renseignements ou de devis.</p>
      </header>

      <section className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="Nom" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Téléphone" />
          <textarea placeholder="Votre message..." required></textarea>
          <button type="submit">Envoyer</button>
        </form>

        <div className="contact-info">
          <h2>Nos Coordonnées</h2>
          <p>Email : <a href="mailto:contact@karlatrans.com">contact@karlatrans.com</a></p>
          <p>Tél. : <a href="tel:+212522405658">+212 522 40 56 58</a></p>
          <p>Adresse : 12 Rue du Port, Casablanca</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
