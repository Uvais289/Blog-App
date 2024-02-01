// App.jsx
import React, { useState } from 'react';
import SignupLogin from './components/SingupLoginp';
import Blog from './components/Blog';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogin = (data) => {
    setUserData(data);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData({});
  };

  return (
    <div>
      {loggedIn ? (
        <Blog username={userData.username} onLogout={handleLogout} />
      ) : (
        <SignupLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
