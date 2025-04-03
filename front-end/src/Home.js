import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue chez Karla Trans</h1>
      <p style={styles.description}>
        Votre partenaire en logistique et transport maritime. Nous vous
        offrons des solutions de transport efficaces et sécurisées.
      </p>
      <div style={styles.services}>
        <div style={styles.card}>
          <h2>🚢 Transport Maritime</h2>
          <p>Expédition rapide et fiable à travers le monde.</p>
        </div>
        <div style={styles.card}>
          <h2>📦 Logistique</h2>
          <p>Gestion et optimisation de vos flux logistiques.</p>
        </div>
        <div style={styles.card}>
          <h2>⚓ Services Portuaires</h2>
          <p>Assistance complète pour le dédouanement et la manutention.</p>
        </div>
      </div>
    </div>
  );
};

// Styles de la page d'accueil
const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#ecf0f1",  // Fond gris clair
    minHeight: "100vh",
  },
  title: {
    fontSize: "3em",
    color: "#2c3e50",  // Texte sombre pour le contraste
    marginBottom: "20px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2em",
    color: "#7f8c8d",  // Gris moyen
    margin: "20px 0",
    lineHeight: "1.5",
  },
  services: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    width: "280px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
  },
};

export default Home;
