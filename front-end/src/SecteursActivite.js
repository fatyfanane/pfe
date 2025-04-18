import React, { useState, useEffect } from "react";
import "./SecteursActivite.css";
import {
  FaPlane, FaMicrochip, FaTshirt,
  FaCar, FaCapsules, FaLeaf
} from "react-icons/fa";

const secteursData = [
  {
    id: "aeronautique", icon: <FaPlane />, title: "Aéronautique",
    description: "Transport de réacteurs, AOG Service, ADR...",
    details: "Solutions sur mesure pour l'industrie aéronautique.",
    image: "/images/aeronautique.jpg", category: "Industrie"
  },
  {
    id: "high-tech", icon: <FaMicrochip />, title: "High-tech",
    description: "Transport sécurisé de produits électroniques.",
    details: "Sécurisation optimale pour équipements sensibles.",
    image: "/images/high-tech.jpg", category: "Technologie"
  },
  {
    id: "textile", icon: <FaTshirt />, title: "Textile",
    description: "Stockage et distribution pour marques de prêt-à-porter.",
    details: "Flux logistiques adaptés au secteur mode et textile.",
    image: "/images/textile.jpg", category: "Commerce"
  },
  {
    id: "automobile", icon: <FaCar />, title: "Automobile",
    description: "Transport de pièces détachées et véhicules.",
    details: "Services spécialisés pour l'industrie automobile.",
    image: "/images/automobile.jpg", category: "Industrie"
  },
  {
    id: "pharma", icon: <FaCapsules />, title: "Pharmaceutique",
    description: "Température contrôlée et suivi rigoureux.",
    details: "Respect total des normes sanitaires et traçabilité.",
    image: "/images/pharmaceutique.jpg", category: "Santé"
  },
  {
    id: "denrees", icon: <FaLeaf />, title: "Denrées Périssables",
    description: "Frais, surgelé, distribution alimentaire.",
    details: "Logistique optimisée pour les produits sensibles.",
    image: "/images/denrees.jpg", category: "Agroalimentaire"
  }
];

const SecteursActivite = () => {
  const [selected, setSelected] = useState(null);
  const [filtered, setFiltered] = useState(secteursData);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selected]);

  const handleFilter = (cat) => {
    setFilter(cat);
    setFiltered(
      cat === "Tous" ? secteursData : secteursData.filter(s => s.category === cat)
    );
  };

  return (
    <div className="secteurs-page">
      <header className="secteurs-header">
        <h1>Nos Secteurs d'Activité</h1>
        <p>Découvrez les domaines dans lesquels Karla Trans intervient avec expertise.</p>
        <div className="filter-buttons">
          {["Tous", "Industrie", "Technologie", "Commerce", "Santé", "Agroalimentaire"].map(cat => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="secteurs-grid">
        {filtered.map((secteur) => (
          <div
            key={secteur.id}
            className="secteur-card"
            onClick={() => setSelected(secteur)}
          >
            <div className="icon">{secteur.icon}</div>
            <h2>{secteur.title}</h2>
            <p>{secteur.description}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setSelected(null)}>&times;</span>
            <h2>{selected.title}</h2>
            <img src={selected.image} alt={selected.title} className="modal-image" />
            <p>{selected.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecteursActivite;
