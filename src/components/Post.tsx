import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const handleCommentPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(`/posts/${id}`, {
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
    console.log('test');
    try {
      let token = localStorage.getItem('token');
      const response = await fetch(`/posts/${id}/comments/${commentId}`, {
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
      <div className="post">
        <h1>{post.title}</h1>
        <p>
          {post.author} | {post.timestamp}
        </p>
        <p>{post.text}</p>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => {
          return (
            <div className="comment" key={comments.indexOf(comment)}>
              <p>{comment.author}</p>
              <p>{comment.text}</p>
              {localStorage.getItem('id') === comment.authorId && (
                <button onClick={() => handleCommentDelete(comment._id)}>
                  Delete Comment
                </button>
              )}
            </div>
          );
        })}
      </div>
      <form action={`/posts/${id}`} method="POST" onSubmit={handleCommentPost}>
        <p>{responseMessage}</p>
        <input type="text" name="text" onChange={handleInputChange()} />
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Post;
