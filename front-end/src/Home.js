import React, { useEffect, useState } from "react";
import { FaShip, FaBoxes, FaAnchor } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Home.css";

const backgroundImages = [
"https://corlettexpress.com/storage/2023/01/What-Is-Logistics-Management-and-Why-Is-It-Important-2048x1024.webp",
  "https://www.paymentsjournal.com/wp-content/uploads/2021/12/transportation-logistics-container-cargo-ship-cargo-plane-3d-rendering-illustration-scaled.jpg",
  "https://rare-gallery.com/uploads/posts/508726-barcelona-cargo.jpg"
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-slider">
        {backgroundImages.map((img, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="hero-overlay">
              
              <h1 className="hero-title">KARLA TRANS</h1>
              <img
            src="/logokarla.png"
            alt="Karla Trans Logo"
            className="hero-logo-large"
          />
              <p className="hero-subtitle">Votre partenaire logistique maritime de confiance</p>
              <a href="#services" className="cta-button">Explorer nos services</a>
            </div>
          </div>
        ))}
      </section>

      {/* Section Services */}
      <section id="services" className="services-section">
        <h2 className="section-title">Nos Services</h2>
        <div className="services">
          <div className="card">
            <FaShip className="icon" />
            <h3>Transport Maritime</h3>
            <p>Expédition rapide, fiable et internationale par voie maritime.</p>
            <NavLink to="/transport-maritime" className="card-link">En savoir plus</NavLink>
          </div>
          <div className="card">
            <FaBoxes className="icon" />
            <h3>Logistique</h3>
            <p>Suivi complet de vos flux de marchandises et entreposage optimisé.</p>
            <NavLink to="/logistique" className="card-link">En savoir plus</NavLink>
          </div>
          <div className="card">
            <FaAnchor className="icon" />
            <h3>Services Portuaires</h3>
            <p>Dédouanement, manutention et accompagnement au port.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;