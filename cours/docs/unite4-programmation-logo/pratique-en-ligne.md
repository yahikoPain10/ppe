---
id: pratique-en-ligne
title: Logo en ligne
sidebar_label: Pratique en ligne
sidebar_position: 2
---

# Pratique : Logo en ligne

import React, { useState } from 'react';

export const LogoInteractif = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const logoUrl = "http://yahikopain10.github.io/ppe-support/logo-online";

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <button 
          onClick={() => setReloadKey(reloadKey + 1)}
          style={{
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Réinitialiser l'espace de travail
        </button>
        
        <button 
          onClick={() => window.open(logoUrl, '_blank', 'noopener,noreferrer')}
          style={{
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Ouvrir dans un nouvel onglet
        </button>
      </div>
      
      <iframe 
        key={reloadKey}
        src={logoUrl} 
        width="100%" 
        height="650px" 
        style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
        title="Logo en ligne"
      />
    </div>
  );
};

<LogoInteractif />