import axios from "axios";

// Appel API pour se connecter
export const login = async (credentials) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
  const { token, user } = response.data;

  // Stocker le token et l'utilisateur
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};

// Fonction utilitaire pour récupérer l'utilisateur courant
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
