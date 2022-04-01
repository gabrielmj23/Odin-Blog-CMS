import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import checkLogin from '../checkLogin';

function CommentButtons(props) {
  const params = useParams();
  const navigate = useNavigate();

  // Comment delete handler
  const [status, setStatus] = useState(0);
  const deleteComment = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments/${props.comment._id}`;

    // Fetch API to delete comment
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      });

      // Reload on success
      if (response.status === 200) {
        window.location.reload(false);
      }

      // Save fetch status code
      setStatus(response.status);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // Click handler
  const handleClick = (e) => {
    // Check if JWT is valid on click
    if (!checkLogin()) {
      return navigate('/login');
    }

    deleteComment();
    e.preventDefault();
  }

  return (
    <div className='col-5'>
      <div className='align-self-center text-center'>
        <Link to={`/posts/${params.postId}/comments/${props.comment._id}`}>
          <button className='btn btn-primary mx-3'>Edit comment</button>
        </Link>
        <button 
        className='btn btn-danger'
        onClick={(e) => {handleClick(e)}}>
          Delete comment
        </button>
      </div>
      {
        // Render message on deletion error
        (status !== 0 && status !== 200) ?
          (
            <div className='text-center'>
              <p className='text-danger'>Something went wrong.</p>
            </div>
          )
          : null
      }
    </div>
  )
}

export default CommentButtons;