import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { newPost } from '../types.d';

const theme = createTheme();

export default function PostForm() {
  const [formData, setFormData] = React.useState<newPost>({
    title: '',
    problem: '',
    solution: '',
    adminPass: '',
  });

  // Change form data on input and check validity after change
  const handleInputChange =
    (name: keyof newPost) => (e: React.SyntheticEvent) => {
      let target = e.target as HTMLInputElement;
      let array = formData;
      let key = array[name];
      key = target.value;
      array[name] = key;
      setFormData({ ...array });
    };

  const [responseMessage, setResponseMessage] = React.useState<string>('');

  // Submit form data from state as json
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(
        'https://afternoon-forest-49583.herokuapp.com/api/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            title: formData.title,
            problem: formData.problem,
            solution: formData.solution,
            adminPass: formData.adminPass,
          }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      if (response.ok) {
        window.location.replace('/posts');
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
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  onChange={handleInputChange('title')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="problem"
                  label="Problem"
                  type="text"
                  id="problem"
                  multiline
                  onChange={handleInputChange('problem')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="solution"
                  label="Solution"
                  type="text"
                  id="solution"
                  multiline
                  onChange={handleInputChange('solution')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="adminPass"
                  label="Admin Password"
                  type="password"
                  id="adminPass"
                  onChange={handleInputChange('adminPass')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Post
            </Button>
          </Box>
        </Box>
        <Typography component="p" variant="body1">
          {responseMessage}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
