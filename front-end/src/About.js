import React, { useState, useEffect } from "react";
import './About.css';


const About = () => {
  const [activeTab, setActiveTab] = useState("innovation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    "https://www.ship-technology.com/wp-content/uploads/sites/8/2022/02/GettyImages-968819844-scaled.jpg",
    "https://prosertek.com/wp-content/uploads/ports-in-2030.jpg",
    "https://www.portseurope.com/wp-content/uploads/2023/10/Global-Ports-Russia.jpeg"
  ];
 
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setShowModal(true);
  };

  const values = [
    {
      id: "innovation",
      title: "Innovation",
      icon: "🚀",
      shortDesc: "Des solutions technologiques au service de la logistique.",
      longDesc: (
        <>
          <p>
            Chez Karla Trans, nous croyons que la logistique de demain se construit avec les technologies d'aujourd'hui. 
            C'est pourquoi nous plaçons l'innovation au cœur de notre stratégie, en intégrant des solutions intelligentes 
            qui transforment chaque étape de notre chaîne logistique.
          </p>
          <ul>
            <li><span className="bullet">🔹</span> <strong>La géolocalisation en temps réel</strong>, nos clients suivent leurs marchandises à chaque instant.</li>
            <li><span className="bullet">🔹</span> <strong>Des algorithmes de planification avancés</strong>, qui optimisent les trajets et réduisent les délais.</li>
            <li><span className="bullet">🔹</span> <strong>Des plateformes numériques de gestion</strong>, pour un contrôle fluide, rapide et sécurisé des expéditions.</li>
            <li><span className="bullet">🔹</span> <strong>Des capteurs IoT embarqués</strong>, assurant la surveillance des conditions de transport.</li>
            <li><span className="bullet">🔹</span> <strong>L'intelligence artificielle</strong>, qui anticipe les besoins et améliore la gestion des stocks.</li>
          </ul>
          <p>
            <strong>Notre mission ?</strong> Offrir à nos partenaires efficacité, transparence et performance, tout en respectant 
            des standards de qualité élevés et une démarche écoresponsable.
          </p>
        </>
      )
    },
    {
      id: "fiabilite",
      title: "Fiabilité",
      icon: "🛡",
      shortDesc: "Un service ponctuel, transparent et sécurisé.",
      longDesc: (
        <>
          <p>
            La fiabilité est notre engagement fondamental envers nos clients. Nous comprenons que chaque envoi représente 
            une promesse que vous faites à vos propres clients - une promesse que nous prenons au sérieux.
          </p>
          <ul>
            <li><span className="bullet">🔹</span> <strong>Ponctualité garantie</strong> grâce à notre réseau mondial optimisé</li>
            <li><span className="bullet">🔹</span> <strong>Suivi transparent</strong> avec des mises à jour en temps réel</li>
            <li><span className="bullet">🔹</span> <strong>Infrastructure sécurisée</strong> pour la protection de vos marchandises</li>
            <li><span className="bullet">🔹</span> <strong>Conformité réglementaire</strong> dans tous les pays où nous opérons</li>
          </ul>
          <p>
            Lorsque vous choisissez Karla Trans, vous choisissez la tranquillité d'esprit.
          </p>
        </>
      )
    },
    {
      id: "engagement",
      title: "Engagement",
      icon: "🤝",
      shortDesc: "Une équipe dévouée et orientée satisfaction client.",
      longDesc: (
        <>
          <p>
            Notre engagement client va au-delà du simple transport. Nous nous considérons comme une extension de votre entreprise, 
            comprenant vos défis et objectifs pour vous offrir un service personnalisé.
          </p>
          <ul>
            <li><span className="bullet">🔹</span> <strong>Service client disponible 24/7</strong> pour répondre à vos questions</li>
            <li><span className="bullet">🔹</span> <strong>Solutions personnalisées</strong> adaptées à vos besoins spécifiques</li>
            <li><span className="bullet">🔹</span> <strong>Gestion proactive</strong> des problèmes potentiels</li>
            <li><span className="bullet">🔹</span> <strong>Amélioration continue</strong> basée sur vos retours d'expérience</li>
          </ul>
          <p>
            Notre succès se mesure à travers votre satisfaction et la croissance de votre entreprise.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="about-page">
     
     

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Karla Trans</h1>
          <div className="subtitle-wrapper">
            <p className="subtitle">Excellence logistique et maritime</p>
            <p className="subtitle-accent">au service de votre performance</p>
          </div>
          <button className="hero-cta">Découvrir nos services</button>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Gallery Section */}
      <section id="about" className="section-container">
        <div className="section-header">
          <h2>Notre expertise maritime</h2>
          <div className="separator"></div>
        </div>
        
        <div className="image-carousel">
          <img 
            src={images[currentImage]} 
            alt={`Karla Trans maritime service ${currentImage + 1}`} 
            className="carousel-image"
          />
          <div className="carousel-controls">
            {images.map((_, index) => (
              <button 
                key={index} 
                className={`carousel-dot ${currentImage === index ? "active" : ""}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

       

      {/* Image Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <img src={images[currentImage]} alt="Large view" className="modal-image" />
            <div className="modal-navigation">
              <button 
                onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                className="nav-button"
              >
                &#8592;
              </button>
              <span>{currentImage + 1} / {images.length}</span>
              <button 
                onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                className="nav-button"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      )}


      {/* About Content */}
      <section className="about-content">
        <div className="section-header">
          <h2>À propos de nous</h2>
          <div className="separator"></div>
        </div>
        <div className="about-grid">
          <div className="about-text">
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
          </div>
          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number">15+</span>
              <span className="stat-label">Années d'expérience</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">45</span>
              <span className="stat-label">Pays desservis</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction client</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support client</span>
            </div>
          </div>
        </div>
      </section>
      <section id="valeurs" className="about-values section-container">
        <div className="section-header">
          <h2>Nos valeurs</h2>
          <div className="separator"></div>
          <p className="section-intro">Les principes qui guident notre travail au quotidien</p>
        </div>

        <div className="values-tabs">
          <div className="tab-headers">
            {values.map(value => (
              <button 
                key={value.id}
                className={`tab-header ${activeTab === value.id ? "active" : ""}`}
                onClick={() => setActiveTab(value.id)}
              >
                <span className="tab-icon">{value.icon}</span>
                {value.title}
              </button>
            ))}
          </div>
          
          <div className="tab-content">
            {values.map(value => (
              <div 
                key={value.id} 
                className={`tab-panel ${activeTab === value.id ? "active" : ""}`}
              >
                <h3>{value.icon} {value.title}</h3>
                <p className="tab-short-desc">{value.shortDesc}</p>
                <div className="tab-long-desc">
                  {value.longDesc}
                </div>
              </div>
            ))}
          </div>
        </div>
     
      </section>
      <div className="image-gallery">
          {images.map((img, index) => (
            <div key={index} className="gallery-item" onClick={() => handleImageClick(index)}>
              <img src={img} alt={`Karla Trans ${index + 1}`} className="gallery-image" />
              <div className="gallery-overlay">
                <span>Voir +</span>
              </div>
            </div>
          ))}
        </div>
        
      </section>

      {/* Values Section */}
     
      {/* Contact Section */}
     

      {/* Footer */}
      
    </div>
  );
};

export default About;