import React, { useState } from "react";
import "./SecteursActivite.css";
import { FaPlane, FaMicrochip, FaTshirt, FaCar, FaCapsules, FaLeaf } from "react-icons/fa";

const SecteursActivite = () => {
  const [selectedSecteur, setSelectedSecteur] = useState(null);

  const secteurs = [
    { 
      id: "aeronautique", icon: <FaPlane />, title: "Aéronautique", 
      description: "Transport de réacteurs, AOG Service, marchandises réglementées ADR...", 
      details: "Nous offrons des solutions de transport adaptées aux besoins spécifiques de l'industrie aéronautique.", 
      image: "/images/aeronautique.jpg" 
    },
    { 
      id: "high-tech", icon: <FaMicrochip />, title: "High-tech", 
      description: "Acheminement sécurisé de produits électroniques et informatiques.", 
      details: "Nous garantissons un transport sécurisé pour vos équipements technologiques.", 
      image: "/images/high-tech.jpg" 
    },
    { 
      id: "textile", icon: <FaTshirt />, title: "Textile", 
      description: "Consolidation, distribution, stockage et entreposage des produits textiles.", 
      details: "Nos services incluent la logistique et la distribution pour les marques de textile.", 
      image: "/images/textile.jpg" 
    },
    { 
      id: "automobile", icon: <FaCar />, title: "Industrie Automobile", 
      description: "Transport et logistique pour les pièces et véhicules automobiles.", 
      details: "Nous assurons le transport des pièces détachées et véhicules avec expertise.", 
      image: "/images/automobile.jpg" 
    },
    { 
      id: "pharmaceutique", icon: <FaCapsules />, title: "Pharmaceutique", 
      description: "Acheminement de médicaments et produits sensibles sous température contrôlée.", 
      details: "Nos solutions garantissent le respect des normes pour le transport pharmaceutique.", 
      image: "/images/pharmaceutique.jpg" 
    },
    { 
      id: "denrees", icon: <FaLeaf />, title: "Denrées Périssables", 
      description: "Transport rapide et sécurisé des produits alimentaires frais et surgelés.", 
      details: "Nous proposons des solutions adaptées au transport des produits alimentaires périssables.", 
      image: "/images/denrees.jpg" 
    }
  ];

  const openModal = (secteur) => {
    setSelectedSecteur(secteur);
  };

  const closeModal = () => {
    setSelectedSecteur(null);
  };

  return (
    <div>
      <div className="secteurs-container">
        <aside className="sidebar">
          <h2>Secteur d'Activité</h2>
          <ul>
            {secteurs.map((secteur) => (
              <li key={secteur.id}>
                <a href={`#${secteur.id}`}>{secteur.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="content">
          <h1>Nos Secteurs d'Activité</h1>
          <div className="grid">
            {secteurs.map((secteur) => (
              <div
                key={secteur.id}
                id={secteur.id}
                className="card"
                onClick={() => openModal(secteur)}
              >
                <div className="icon">{secteur.icon}</div>
                <h2>{secteur.title}</h2>
                <p>{secteur.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedSecteur && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedSecteur.title}</h2>
            <img src={selectedSecteur.image} alt={selectedSecteur.title} className="modal-image" />
            <p>{selectedSecteur.details}</p>
          </div>
        </div>
      )}

      <div className="contact-expert">
        <h2>Contacter un expert</h2>
        <p>Nous vous proposons les solutions les mieux adaptées à vos besoins.</p>
        <a href="/contact" className="btn-contact">CONTACT</a>
      </div>

      <div className="demande-devis">
        <h2>Demander un devis</h2>
        <p>Envoyez-nous votre demande !</p>
        <a href="/devis" className="btn-devis">DEVIS</a>
      </div>
    </div>
  );
};

export default SecteursActivite;
