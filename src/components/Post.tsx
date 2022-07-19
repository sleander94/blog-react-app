import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { post, comment } from '../types.d';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { userProps } from '../types.d';

const Post = ({ loggedIn, admin }: userProps) => {
  const [post, setPost] = useState<post>({
    author: '',
    authorId: '',
    solution: '',
    problem: '',
    timestamp: '',
    title: '',
    __v: 0,
    _id: '',
  });
  const [comments, setComments] = useState<comment[]>([]);
  const { id } = useParams();

  const getPostAndComments = async () => {
    try {
      const response = await fetch(
        `https://afternoon-forest-49583.herokuapp.com/api/posts/${id}`
      );
      const data = await response.json();
      setPost(data.post);
      setComments(data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostAndComments();
  }, []);

  const [commentText, setCommentText] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  // Change comment text on input
  const handleInputChange = () => (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setCommentText(target.value);
  };

  const handleCommentPost = async () => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(
        `https://afternoon-forest-49583.herokuapp.com/api/posts/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            text: commentText,
          }),
        }
      );
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      getPostAndComments();
      // Clear textfield on successful post
      if (document.getElementById('commentText')) {
        const text = document.getElementById('commentText') as HTMLInputElement;
        text.value = '';
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentDelete = async (commentId: String) => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(
        `https://afternoon-forest-49583.herokuapp.com/api/posts/${id}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      getPostAndComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostDelete = async () => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(
        `https://afternoon-forest-49583.herokuapp.com/api/posts/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
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
    <section id="post">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          container
          justifyContent="center"
          spacing={0}
          columns={1}
          maxWidth={900}
        >
          <Grid item xs={11} md={8}>
            <CardContent>
              <Card sx={{ bgcolor: '#e5e5e5' }}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  sx={{ p: 2 }}
                >
                  {post.title}
                </Typography>
                <Typography component="h2" variant="subtitle1" align="center">
                  {post.timestamp}
                </Typography>
                <Typography
                  component="h2"
                  variant="h6"
                  align="center"
                  sx={{ p: 1, textDecoration: 'underline' }}
                >
                  Problem
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  align="center"
                  sx={{ p: 2 }}
                >
                  {post.problem}
                </Typography>
                <Typography
                  component="h2"
                  variant="h6"
                  align="center"
                  sx={{ p: 1, textDecoration: 'underline' }}
                >
                  Solution
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  align="center"
                  sx={{ p: 2 }}
                >
                  {post.solution}
                </Typography>
              </Card>
            </CardContent>
          </Grid>
          {admin && (
            <Box
              textAlign="center"
              sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to delete this post?')
                  )
                    handlePostDelete();
                }}
                sx={{ mt: 1 }}
                color="error"
              >
                Delete Post
              </Button>
            </Box>
          )}
          <Grid item xs={11} md={8}>
            <Typography
              component="h2"
              variant="h6"
              align="center"
              sx={{ p: 2, textDecoration: 'underline' }}
            >
              Comments
            </Typography>
          </Grid>
          {comments.map((comment) => {
            return (
              <Grid item xs={11} md={8} key={comments.indexOf(comment)}>
                <CardContent>
                  <Card sx={{ bgcolor: '#e5e5e5' }}>
                    <Typography component="p" variant="subtitle1" sx={{ p: 2 }}>
                      {comment.author}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ p: 2, pt: 0 }}
                    >
                      {comment.text}
                    </Typography>
                  </Card>
                </CardContent>
                {localStorage.getItem('id') === comment.authorId && (
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleCommentDelete(comment._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Grid>
            );
          })}
          {loggedIn && (
            <Grid item xs={11} md={8}>
              <Typography component="p" variant="subtitle2" sx={{ p: 1 }}>
                {responseMessage}
              </Typography>
              <TextField
                required
                fullWidth
                name="text"
                label="New Comment"
                type="text"
                id="commentText"
                onChange={handleInputChange()}
              />
              <Box textAlign="center">
                <Button
                  variant="contained"
                  onClick={() => handleCommentPost()}
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          )}
          {!loggedIn && (
            <Grid item xs={11} md={8}>
              <Typography
                component="p"
                variant="h6"
                sx={{ p: 1, textAlign: 'center' }}
              >
                Log in to leave a comment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </section>
  );
};

export default Post;
