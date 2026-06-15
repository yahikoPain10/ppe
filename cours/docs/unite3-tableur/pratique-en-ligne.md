---
id: pratique-en-ligne
title: Tableur en ligne
sidebar_label: Pratique en ligne
sidebar_position: 7
---

# Pratique : Tableur en ligne

import React, { useState } from 'react';

export const TableurInteractif = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const tableurUrl = "https://yahikopain10.github.io/ppe-support/tableur-online/";

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
          onClick={() => window.open(tableurUrl, '_blank', 'noopener,noreferrer')}
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
        src={tableurUrl} 
        width="100%" 
        height="650px" 
        style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
        title="Tableur en ligne"
      />
    </div>
  );
};

<TableurInteractif />