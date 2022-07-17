import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Post from './components/Post';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || 'no token'
  );

  // Check if user is logged in via jwt token on each render
  const checkToken = () => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} token={token} checkToken={checkToken} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path={`/posts/:id`} element={<Post />} />
          {loggedIn && (
            <Route path="/login" element={<Navigate to="/posts" />} />
          )}
          {loggedIn && (
            <Route path="/signup" element={<Navigate to="/posts" />} />
          )}
          <Route
            path="/login"
            element={
              <Login
                loggedIn={loggedIn}
                token={token}
                checkToken={checkToken}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                loggedIn={loggedIn}
                token={token}
                checkToken={checkToken}
              />
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
