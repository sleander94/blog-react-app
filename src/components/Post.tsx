import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { post, comment } from '../types.d';

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
  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const response = await fetch(`/posts/${id}`);
        const data = await response.json();
        setPost(data.post);
        setComments(data.comments);
      } catch (err) {
        console.error(err);
      }
    };
    getPostAndComments();
  }, []);

  return (
    <section id="post">
      <div className="post">
        <h1>{post.title}</h1>
        <p>
          {post.author} | {post.timestamp}
        </p>
        <p>{post.text}</p>
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="comment" key={comments.indexOf(comment)}>
              <p>{comment.author}</p>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Post;
