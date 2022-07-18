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
import PostForm from './components/PostForm';

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [userID, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || 'no token'
  );

  // Check if user is logged in via jwt token
  const checkToken = () => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const [admin, setAdmin] = useState<boolean>(false);

  // Get user's first and last name, id, and admin status from local storage if loggedIn
  const getUserInfo = () => {
    if (loggedIn) {
      const name =
        localStorage.getItem('firstname') +
        ' ' +
        localStorage.getItem('lastname');
      setUsername(name);
      const id = localStorage.getItem('id');
      typeof id === 'string' ? setUserId(id) : setUserId('');
      localStorage.getItem('admin') == 'true'
        ? setAdmin(true)
        : setAdmin(false);
    } else {
      setUsername('');
      setUserId('');
      setAdmin(false);
    }
  };

  useEffect(() => {
    checkToken();
    getUserInfo();
  });

  return (
    <div className="App">
      <Navbar
        loggedIn={loggedIn}
        checkToken={checkToken}
        username={username}
        admin={admin}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path={`/posts/:id`}
            element={<Post loggedIn={loggedIn} checkToken={checkToken} />}
          />
          {loggedIn && (
            <Route path="/login" element={<Navigate to="/posts" />} />
          )}
          {loggedIn && (
            <Route path="/signup" element={<Navigate to="/posts" />} />
          )}
          <Route
            path="/login"
            element={<Login loggedIn={loggedIn} checkToken={checkToken} />}
          />
          <Route path="/signup" element={<Signup checkToken={checkToken} />} />
          <Route path="/new-post" element={<PostForm />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
