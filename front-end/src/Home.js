import React, { useEffect, useState } from 'react';
import { FaShip, FaBoxes, FaAnchor } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Container, Grid, Stack, Box, Button, Typography } from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";




import './Home.css';

const bgImage =
  "https://wallpaperbat.com/img/8608087-why-logistics-problems-are-often.jpg";
  const AnimatedCounter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
  

useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.2 }
  );

  const targets = document.querySelectorAll('.section-title, .card');
  targets.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);

  
    useEffect(() => {
      let start = 0;
      const increment = target / (duration / 10);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 10);
      return () => clearInterval(timer);
    }, [target, duration]);
  
    return <span>{count.toLocaleString()}</span>;
  };
  
const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      quote: "Karla Trans a transformé notre chaîne logistique. Leur professionnalisme est inégalé.",
      name: "Ahmed El Mansouri",
      role: "Directeur Logistique, Maroc Shipping",
    },
    {
      quote: "Service impeccable et ponctualité remarquable. Je recommande vivement Karla Trans.",
      name: "Fatima Zahra Bensalah",
      role: "CEO, Atlas Export",
    },
    {
      quote: "Une équipe dédiée qui comprend les besoins de ses clients. Bravo Karla Trans!",
      name: "Youssef El Idrissi",
      role: "Responsable Achats, Sahara Trading",
    },
  ];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section  animated-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" align="center" gutterBottom className="testimonials-title">
            Ce que disent nos clients
          </Typography>
        </motion.div>
        <Box className="carousel-container">
        <AnimatePresence mode="wait">
  <motion.div
    key={index}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
    className="testimonial-card"
  >
    <Typography variant="body1" className="testimonial-quote">
      "{testimonials[index].quote}"
    </Typography>
    <Typography variant="subtitle1" className="testimonial-name">
      {testimonials[index].name}
    </Typography>
    <Typography variant="body2" className="testimonial-role">
      {testimonials[index].role}
    </Typography>
  </motion.div>
</AnimatePresence>

          <Box className="carousel-buttons">
            <IconButton onClick={handlePrev} className="carousel-button">
              <ArrowBackIos />
            </IconButton>
            <IconButton onClick={handleNext} className="carousel-button">
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

const Home = () => {
  const [showAbout, setShowAbout] = useState(false);

  const handleToggleAbout = () => {
    setShowAbout(true);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Box
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.6), rgba(0, 51, 102, 0.6)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} md={7} lg={6} direction="column" justifyContent="center">
            <Typography variant="h3" color="white" fontWeight="bold" gutterBottom>
              Votre partenaire logistique maritime de confiance
            </Typography>
            <Typography variant="body1" color="white" sx={{ opacity: 0.9 }}>
              "Un bon suivi logistique ne suit pas les marchandises… il les anticipe."
            </Typography>
            <Stack direction="row" spacing={2} mt={4}>
              <Button variant="contained" color="warning" href="#services">
                Explorer nos services
              </Button>
              <Button variant="outlined" color="warning" component={NavLink} to="/about">
                À propos de nous
              </Button>
            </Stack>
          </Grid>
        </Container>
      </Box>

      {/* Intro Text */}
      <div className="intro-text">
        <h2>Optimisez vos chaînes d’approvisionnement avec KARLA TRANS</h2>
        <p>
          Grâce à notre expertise dans le transport maritime, la logistique et
          les services portuaires, nous vous accompagnons à chaque étape pour
          garantir la fluidité et la performance de vos opérations.
        </p>
        <Box mt={4}>
  {!showAbout && (
   
  
    <Button
      variant="contained"
      onClick={handleToggleAbout}
      sx={{
        backgroundColor: '#e88f00',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#ffae00',
        },
      }}
    >
      Découvrir l’entreprise
    </Button>
  
  )}
</Box>

      </div>

      {/* À propos (Conditionnel) */}
      {showAbout && (
        <section className="about-karla">
          <Container maxWidth="md">
            <Typography variant="h4" className="about-title">
              Karla Trans : Expert du transport maritime et logistique au Maroc
            </Typography>
            <Typography variant="body1" className="about-description">
              Karla Trans est une entreprise marocaine implantée à Casablanca, opérant
              dans le domaine du transport maritime, des opérations portuaires et des
              services logistiques intégrés. Depuis sa création, Karla Trans a su
              s’imposer comme un acteur fiable grâce à sa maîtrise des flux logistiques,
              sa proximité avec les infrastructures portuaires nationales et sa capacité
              à répondre aux exigences de ses partenaires nationaux et internationaux.
              <br /><br />
              L’entreprise propose une large gamme de prestations, allant de la gestion
              des conteneurs à l’organisation des expéditions maritimes, en passant par
              le transit douanier et la logistique de distribution. Elle accompagne aussi
              bien les grandes entreprises que les PME dans leurs besoins en matière de
              transport de marchandises, en leur assurant efficacité, ponctualité et
              traçabilité.
              <br /><br />
              Avec une vision tournée vers l’innovation et la satisfaction client, Karla
              Trans s’inscrit aujourd’hui dans une démarche de digitalisation progressive
              de ses services afin d’améliorer sa performance et renforcer sa position
              sur le marché.
            </Typography>
            <Box mt={4}>
              <Button variant="contained" color="primary" component={NavLink} to="/contact">
                Nous contacter
              </Button>
            </Box>
          </Container>
        </section>
      )}
      {/* Section Services */}
      <section id="services" className="services-section">
        <h2 className="section-title">Nos Services</h2>
        <div className="services">
          <div className="card">
            <FaShip className="icon" />
            <h3>Transport Maritime</h3>
            <p>Nous assurons le transport de vos marchandises à l'international, avec fiabilité et transparence.</p>
            <NavLink to="/transport-maritime" className="card-link">En savoir plus</NavLink>
          </div>
          <div className="card">
            <FaBoxes className="icon" />
            <h3>Logistique</h3>
            <p>Du stockage à la gestion des flux, nous mettons en place des solutions logistiques intelligentes.</p>
            <NavLink to="/logistique" className="card-link">En savoir plus</NavLink>
          </div>
          <div className="card">
            <FaAnchor className="icon" />
            <h3>Services Portuaires</h3>
            <p>Formalités douanières, manutention portuaire, coordination des opérations à quai.</p>
          </div>
        </div>
        </section>
        <section className="stats-section">
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Nos chiffres clés
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box className="stat-circle">
              <MonetizationOnIcon className="stat-icon" />
              <Typography variant="h5">
                <AnimatedCounter target={100000000} duration={2000} /> MAD
              </Typography>
              <Typography variant="body2">Chiffre d'affaires</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="stat-circle">
              <PeopleIcon className="stat-icon" />
              <Typography variant="h5">
                <AnimatedCounter target={500} duration={2000} />+
              </Typography>
              <Typography variant="body2">Clients satisfaits</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="stat-circle">
              <EmojiEventsIcon className="stat-icon" />
              <Typography variant="h5">
                <AnimatedCounter target={15} duration={2000} /> ans
              </Typography>
              <Typography variant="body2">d'expérience</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
          </section>

     


     
      <section className="contact-section-advanced">
  <Container maxWidth="lg">
    <Typography variant="h4" align="center" gutterBottom>
      Contactez-nous
    </Typography>
    <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
      Une équipe à votre écoute pour vous accompagner dans vos projets logistiques.
    </Typography>

    <Box className="contact-card-advanced">
      {/* Colonne gauche : Infos contact */}
      <Box className="contact-left">
        <div className="contact-line">
          <FaShip className="contact-icon" />
          <span>34, Rue du Port, Casablanca, Maroc</span>
        </div>
        <div className="contact-line">
          <FaPhoneAlt className="contact-icon" />
          <span>+212 522 66 77 88</span>
        </div>
        <div className="contact-line">
          <FaEnvelope className="contact-icon" />
          <span>contact@karlatrans.ma</span>
        </div>
        <div className="contact-line">
          <FaClock className="contact-icon" />
          <span>Lun - Ven : 08h30 - 18h00</span>
        </div>
      </Box>

      {/* Colonne droite : Google Map */}
      <Box className="contact-right">
        <iframe
          title="Karla Trans Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11385.95674663464!2d-7.600068!3d33.5940492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd2957089c7d%3A0xa98550ccffeb05e9!2sKarla+Trans!5e0!3m2!1sfr!2sma!4v1689030102951!5m2!1sfr!2sma"
          allowFullScreen
          loading="lazy"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </Box>
      
    </Box>
    <Box mt={4}>
    <button className="cta-button" onClick={() => window.location.href = "/contact"}>
      ✉ Nous écrire
    </button>
  </Box>
  </Container>

</section>

<TestimonialCarousel />
      
    </div>
  );
  
};

export default Home;