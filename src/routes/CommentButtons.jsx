import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function CommentButtons(props) {
  const params = useParams();

  // Comment delete handler
  const [status, setStatus] = useState(0);
  const deleteComment = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments/${props.comment._id}`;

    // Fetch API to delete comment
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
      });
  
      setStatus(response.status);
  
      // Reload on success
      if (status === 200) {
        setStatus(0);
        window.location.reload(false);
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  return (
    <div className='col-5'>
      <div className='align-self-center text-center'>
        <Link to={`/posts/${params.postId}/comments/${props.comment._id}`}>
          <button className='btn btn-primary mx-3'>Edit comment</button>
        </Link>
        <button 
        className='btn btn-danger'
        onClick={() => deleteComment()}>
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