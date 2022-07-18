import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { userProps } from '../types.d';

const Navbar = ({ loggedIn, checkToken, username, admin }: userProps) => {
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');
    checkToken();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/posts">
              Leander's Leetcode
            </Button>
          </Typography>
          {!loggedIn && (
            <div>
              <Button color="inherit" href="/signup">
                Sign Up
              </Button>
              <Button color="inherit" href="/login">
                Login
              </Button>
            </div>
          )}
          {loggedIn && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{ fontWeight: 600 }}
              >
                {username}
              </Typography>
              {admin && (
                <Button href="/new-post" color="inherit">
                  New Post
                </Button>
              )}
              <Button onClick={logOut} color="inherit">
                Log Out
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
