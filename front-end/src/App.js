import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Logistique from './logistique';
import SecteursActivite from './SecteursActivite';

function App() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shipments')
      .then(response => {
        setShipments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des expéditions:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div>
        <Navbar /> {/* Ajout de la Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/secteursactivite" element={<SecteursActivite />} />
          <Route path="/logistique" element={<Logistique />} />
        </Routes>

      
      </div>
    </Router>
  );
}

export default App;
