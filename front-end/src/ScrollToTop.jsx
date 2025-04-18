import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Défilement vers le haut à chaque changement de route
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
