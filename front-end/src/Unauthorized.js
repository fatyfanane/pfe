import React from 'react';

const Unauthorized = () => {
  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>⛔ Accès refusé</h2>
      <p>Vous n'avez pas les droits pour accéder à cette page.</p>
    </div>
  );
};

export default Unauthorized;
