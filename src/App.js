import React, { useState } from 'react';
import Chatbot from './Chatbot';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with us to learn more about our policies.</h1>
        {/* Background text with 50% transparency */}
        <p className="assist-text">We are here to assist you.</p>
        {/* Render the Chatbot only if the user is logged in */}
        {isLoggedIn ? <Chatbot /> : <Login onLogin={handleLogin} />}
      </header>
    </div>
  );
}

export default App;
