import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Frets from './Frets';
import Logistique from './logistique';
import SecteursActivite from './SecteursActivite';
import Contact from './Contact';
import Services from './Services';
import Transit from './Transit';
import Footer from './Footer';
import TransportMaritime from './TransportMaritime';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterAsClient from './pages/registerAsClient';
import Profil from './pages/Profil';
import UserList from './UserList';
import Unauthorized from './Unauthorized';
import Navbarr from './Navbarr';
import ScrollToTop from './ScrollToTop';
import DemandeDevisForm from './DemandeDevisForm';
import MesDevis from './MesDevis';
import AdminDemandes from './AdminDemandes';
import MesFactures from './MesFactures';
import AjouterExpedition from './AjouterExpedition';
import SuiviExpedition from './SuiviExpedition';
import ListeExpeditions from './ListeExpeditions';

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>



function App() {
  return (
    <Router>
      <div>
      <Navbarr />
        <Navbar />
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/secteursactivite" element={<SecteursActivite />} />
          <Route path="/logistique" element={<Logistique />} />
          <Route path="/frets" element={<Frets />} />
          <Route path="/services" element={<Services />} />
          <Route path="/transit" element={<Transit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userlist" element={<ProtectedRoute  role="admin"><UserList /></ProtectedRoute> } />
          <Route path="/transport-maritime" element={<TransportMaritime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<ProtectedRoute  role="admin">  <Register /></ProtectedRoute> } />
          <Route path="/register/client" element={<RegisterAsClient />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/demande-devis" element={<DemandeDevisForm />} />
          <Route path="/mes-devis" element={<MesDevis />} />
          <Route path="/admin/demandes" element={<ProtectedRoute  role="admin"><AdminDemandes /></ProtectedRoute>} />
          <Route path="/mes-factures" element={<MesFactures />} />
          <Route path="/mes-expeditions" element={<ProtectedRoute  role="admin"><AjouterExpedition/></ProtectedRoute>} />
          <Route path="/suivi-expedition" element={<SuiviExpedition/>} />
          <Route path="/liste-expedition" element={<ListeExpeditions />} />

          <Route path="/client" element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          } />
          
        
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
              
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
