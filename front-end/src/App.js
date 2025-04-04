import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Logistique from './logistique';
import SecteursActivite from './SecteursActivite';
import Frets from './Frets';
import Contact from './Contact';
import Services from './Services';
import Transit from './Transit';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Barre de navigation présente sur toutes les pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/secteursactivite" element={<SecteursActivite />} />
          <Route path="/logistique" element={<Logistique />} />
          <Route path="/services" element={<Services />} />
          <Route path="/transit" element={<Transit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/frets" element={<Frets />} /> {/* Route vers la page Frets */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;