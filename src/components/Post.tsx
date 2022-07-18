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

const Post = () => {
  const [post, setPost] = useState<post>({
    author: '',
    authorId: '',
    isPublic: false,
    text: '',
    timestamp: '',
    title: '',
    __v: 0,
    _id: '',
  });
  const [comments, setComments] = useState<comment[]>([]);
  const { id } = useParams();

  const getPostAndComments = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
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
      const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          text: commentText,
        }),
      });
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      getPostAndComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentDelete = async (commentId: String) => {
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
      getPostAndComments();
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
                  component="p"
                  variant="body1"
                  align="center"
                  sx={{ p: 2 }}
                >
                  {post.text}
                </Typography>
              </Card>
            </CardContent>
          </Grid>
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
                      onClick={() => handleCommentDelete(comment._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Grid>
            );
          })}
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
              id="text"
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
        </Grid>
      </Box>
    </section>
  );
};

export default Post;
