import { useEffect, useState } from 'react';
import { post } from '../types.d';
import PostCard from './PostCard';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState<post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          'https://afternoon-forest-49583.herokuapp.com/api/posts'
        );
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPosts();
  }, []);
  return (
    <section id="posts">
      <Typography component="h1" variant="h3" align="center" sx={{ mb: 4 }}>
        Solved Problems
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post) => {
          return (
            <Grid
              item
              xs={8}
              md={4}
              key={posts.indexOf(post)}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <PostCard
                title={post.title}
                date={post.timestamp}
                id={post._id}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default Posts;
