// SignupLogin.jsx

import React, { useState } from 'react';

const SignupLogin = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = async () => {
    try {
      if (isSignup) {
        const response = await fetch('http://localhost:8008/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error signing up: ${response.statusText}`);
        }

        // Automatically log in after successful signup
        onLogin({ username, email });
      } else {
        const response = await fetch('http://localhost:8008/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        onLogin(data);
      }
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} error:`, error);
    }
  };

  return (
    <div>
      {isSignup ? (
        <div>
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      ) : null}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAction}>{isSignup ? 'Signup' : 'Login'}</button>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? 'Already have an account? Login here.'
          : 'Don\'t have an account? Signup here.'}
      </p>
    </div>
  );
};

export default SignupLogin;
