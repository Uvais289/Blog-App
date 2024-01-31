// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import signupForm from './components/SignupForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/create-blog">Create Blog</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Route path="/login" component={LoginForm} />
        <Route path="/create-blog" component={BlogForm} />
        <Route path="/blogs" component={BlogList} />
        <Route path="/signup" component={signupForm} />
      </div>
    </Router>
  );
};

export default App;
