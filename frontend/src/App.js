import React, { useState, useEffect } from 'react';
import './App.css'; // Add your component-specific CSS here
import KanbanBoard from './Components/KanbanBoard';

function App() {
  // You can define state and useEffects here if needed

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanban Board</h1>
      </header>
      <main className="app-main">
        <KanbanBoard />
      </main>
      
    </div>
  );
}

export default App;
