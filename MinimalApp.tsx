import React from 'react';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#1E5128', 
      minHeight: '100vh', 
      padding: '20px',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🚀 Minimal App Test</h1>
      <p>This is a completely minimal App component.</p>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;
