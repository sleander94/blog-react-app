import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../types.d';

const Posts = () => {
  const [posts, setPosts] = useState<post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('/posts');
        const data = await response.json();
        setPosts(data);
        console.log(posts);
      } catch (err) {
        console.error(err);
      }
    };
    getPosts();
  }, []);
  return (
    <section id="posts">
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <Link to={`/posts/${post._id}`} key={posts.indexOf(post)}>
            {' '}
            <p>{post.title}</p>
            <p>
              {post.author} | {post.timestamp}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Posts;
