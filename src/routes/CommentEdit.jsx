import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import checkLogin from '../checkLogin';

function CommentForm(props) {
  // For routing
  const params = useParams();
  const navigate = useNavigate();

  // States for comment info
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Save comment info to state if available
    if (Object.keys(props.comment).length > 0) {
      setAuthor(props.comment.author);
      setContent(props.comment.content);
    }
  }, [props.comment]);

  // Function to PUT comment update through API
  const editComment = async () => {
    // Fetch info
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments/${params.commentId}`;
    const fetchBody = {
      author: author,
      content: content
    };

    try {
      // Perform fetch
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(fetchBody)
      });

      // Redirect to post view if successful
      if (response.status === 200) {
        navigate(`/posts/${params.postId}`);
        return;
      } else {
        // Get errors
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    // Check if JWT is valid on form submission
    if (!checkLogin()) {
      navigate('/login');
      return;
    }

    editComment();
    e.preventDefault();
  };

  return (
    <form className='form-control p-3' onSubmit={e => {handleSubmit(e)}}>
      <div className='form-group mb-3'>
        <label htmlFor='author'>Author: </label><br/>
        <input
        id='author'
        name='author'
        className='p-1'
        style={{
          width: '75%'
        }}
        type='text'
        placeholder='Comment author'
        required
        onChange={e => setAuthor(e.target.value)}
        value={author}
        />
      </div>

      <div className='form-group mb-4'>
        <label htmlFor='content'>Content: </label><br/>
        <textarea
        id='content'
        name='content'
        style={{
          width: '100%'
        }}
        required
        onChange={e => setContent(e.target.value)}
        value={content}
        ></textarea>

      </div>
      <button className='btn btn-primary' type='submit'>Submit</button>
      <ul>
        {errors.length > 0 &&
          errors.map((error, index) => (
            <li className='text-danger' key={index}>{error.msg}</li>
          ))
        }
      </ul>
    </form>
  );
}

function CommentEdit() {
  const params = useParams();

  // States for fetched comment
  const [status, setStatus] = useState(0);
  const [comment, setComment] = useState({});

  // Fetch comment on mount
  useEffect(() => {
    const fetchComment = async () => {
        const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments/${params.commentId}`;
        try {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
          });
          const data = await response.json();

          // Save comment data in state
          setStatus(response.status);
          setComment(response.status === 200 ?
                      data.comment :
                      {});
        } catch (err) {
          console.log('Error: ', err);
        }
    };

    fetchComment();
  }, [params.postId, params.commentId]);

  return (
    <div className='container-fluid mt-3'>
      <div className='row'>
        <div className='col-2'></div>

        <div className='col-8'>
          {
            status === 200 ?
              (
                <div>
                  <h2 className='text-center mb-4'>Edit Comment</h2>
                  <CommentForm comment={comment} />
                </div>
              ) :
              status === 0 ?
                (
                  <p className='text-center text-primary'>Loading...</p>
                ) :
                (
                  <p className='text-center text-danger'>Comment not found</p>
                )
          }
        </div>

        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default CommentEdit;