import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Hardcoded admin login credentials
  const adminCredentials = {
    name: 'kanika',
    password: '0904',
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if admin login
    if (name === adminCredentials.name && password === adminCredentials.password) {
      alert('Admin login successful');
      setIsAdmin(true);
      onLogin();
      return;
    }

    // Allow anyone to sign up or log in
    if (isSignUp) {
      alert('Account created successfully. You can now log in.');
    } else {
      alert('Login successful.');
    }

    // You can replace the alert with logic to save user data to a database
    onLogin();
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

      {!isAdmin && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {isSignUp && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
      )}

      {isAdmin && <p>Welcome, Admin!</p>}

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Have an account? Login' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
};

export default Login;
