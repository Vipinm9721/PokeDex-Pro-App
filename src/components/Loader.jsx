import React from 'react';

const Loader = () => (
  <div style={{ textAlign: 'center', margin: '2rem' }}>
    <div className="spinner" />
    <style>{`
      .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3b4cca;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

export default Loader;
