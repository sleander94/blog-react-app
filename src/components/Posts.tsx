import { useEffect, useState } from 'react';
import { post } from '../types.d';
import PostCard from './PostCard';
import Grid from '@mui/material/Grid';
import { LinearProgress, Typography } from '@mui/material';
import { decode } from 'html-entities';

const Posts = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          'https://afternoon-forest-49583.herokuapp.com/api/posts'
        );
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
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
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ minHeight: '50vh' }}
      >
        {isLoading && (
          <LinearProgress sx={{ width: '50%', alignSelf: 'center' }} />
        )}
        {!isLoading &&
          posts.map((post) => {
            return (
              <Grid
                item
                xs={8}
                md={4}
                key={posts.indexOf(post)}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <PostCard
                  title={decode(post.title)}
                  date={decode(post.timestamp)}
                  id={decode(post._id)}
                />
              </Grid>
            );
          })}
      </Grid>
    </section>
  );
};

export default Posts;
