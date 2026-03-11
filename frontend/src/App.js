import React from 'react';
import './App.css';
import Home from './Pages/Buyer/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

// This line is essential to fix your "export 'default' was not found" error
export default App;