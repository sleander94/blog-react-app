import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser, formErrors } from '../types.d';
import { userProps } from '../types.d';
import { API_URL } from '../App';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Stephen Leander
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ loggedIn, checkToken }: userProps) {
  // Set error status of all inputs to false by default
  const [errors, setErrors] = React.useState<formErrors>({
    email: false,
    password: false,
  });

  const [formData, setFormData] = React.useState<loginUser>({
    email: '',
    password: '',
  });

  const checkValidity = (name: keyof loginUser) => {
    let newErrors = errors;
    if (formData[name].length === 0) newErrors[name] = true;
    else newErrors[name] = false;
    setErrors(newErrors);
  };

  // Change form data on input and check validity after change
  const handleInputChange =
    (name: keyof loginUser) => (e: React.SyntheticEvent) => {
      let target = e.target as HTMLInputElement;
      let array = formData;
      let key = array[name];
      key = target.value;
      array[name] = key;
      setFormData({ ...array });
      checkValidity(name);
    };

  // Show error message on unsuccessful login (400 response)
  const [badLogin, setBadLogin] = React.useState<boolean>(false);

  // Submit form data from state as json
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://afternoon-forest-49583.herokuapp.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('firstname', data.user.firstname);
      localStorage.setItem('lastname', data.user.lastname);
      localStorage.setItem('id', data.user._id);
      localStorage.setItem('admin', data.user.isAdmin);
      checkToken();
      if (!loggedIn) setBadLogin(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PermIdentityIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Log in
          </Typography>
          {badLogin && (
            <Typography
              component="p"
              sx={{ p: 1, mb: 0, width: '100%' }}
              color="error"
            >
              Invalid email or password.
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  helperText={
                    errors.email !== false
                      ? 'Enter a valid email. ex: john@email.com'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  helperText={
                    errors.password !== false ? 'Enter your password' : ''
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
