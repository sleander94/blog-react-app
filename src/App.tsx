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

  const checkToken = () => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={loggedIn} token={token} checkToken={checkToken} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path={`/posts/:id`} element={<Post />} />
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
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
