import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signupUser, formErrors, userProps } from '../types.d';

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

export default function SignUp({ loggedIn, token, checkToken }: userProps) {
  // Set error status of all inputs to false by default
  const [errors, setErrors] = React.useState<formErrors>({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    'confirm-password': false,
  });

  const [formData, setFormData] = React.useState<signupUser>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm-password': '',
  });

  const checkValidity = (name: keyof signupUser) => {
    let newErrors = errors;
    if (name === 'password') {
      if (formData[name].length < 5) newErrors[name] = true;
      else newErrors[name] = false;
    } else if (name === 'confirm-password') {
      if (formData[name] !== formData.password) newErrors[name] = true;
      else newErrors[name] = false;
    } else if (formData[name].length === 0) newErrors[name] = true;
    else newErrors[name] = false;
    setErrors(newErrors);
  };

  // Change form data on input and check validity after change
  const handleInputChange =
    (name: keyof signupUser) => (e: React.SyntheticEvent) => {
      let target = e.target as HTMLInputElement;
      let array = formData;
      let key = array[name];
      key = target.value;
      array[name] = key;
      setFormData({ ...array });
      checkValidity(name);
    };

  // Submit form data from state as json
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          'confirm-password': formData['confirm-password'],
        }),
      });
      // Login if user is created succesfully.
      if (response.ok) {
        console.log('Ok');
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
          const data = await response.json();
          if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.user);
          }
          checkToken();
        } catch (err) {
          console.error(err);
        }
      }
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
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={handleInputChange('firstname')}
                  error={errors.firstname}
                  helperText={
                    errors.firstname !== false ? 'Enter your first name.' : ''
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleInputChange('lastname')}
                  error={errors.lastname}
                  helperText={
                    errors.lastname !== false ? 'Enter your last name.' : ''
                  }
                />
              </Grid>
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
                    errors.password !== false
                      ? 'Password must be at least 5 characters.'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm"
                  type="password"
                  id="confirm-password"
                  onChange={handleInputChange('confirm-password')}
                  error={errors['confirm-password']}
                  helperText={
                    errors['confirm-password'] !== false
                      ? "Passwords don't match"
                      : ''
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
