import React, { useState } from 'react';
import './App.css';
import CandidateForm from './CandidateForm';

function App() {
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  return (
    <div className="App">
      <header className="dashboard-header">
        <h1>Dashboard Reclutador</h1>
        <button 
          className="add-candidate-btn"
          onClick={() => setShowCandidateForm(true)}
        >
          Añadir Candidato
        </button>
      </header>

      <main className="dashboard-content">
        <p>Bienvenido al Sistema de Seguimiento de Talento (ATS)</p>
      </main>

      {showCandidateForm && (
        <CandidateForm onClose={() => setShowCandidateForm(false)} />
      )}
    </div>
  );
}

export default App;
