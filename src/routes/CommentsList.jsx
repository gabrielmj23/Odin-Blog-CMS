import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import checkLogin from "../checkLogin";
import CommentButtons from "./CommentButtons";

function DeleteAllButton(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);

  // Function to delete all comments
  const deleteComments = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments`;

    // Fetch API 
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

  const handleClick = (e) => {
    // Check if JWT is valid on click
    if (!checkLogin()) {
      return navigate('/login');
    }

    deleteComments();
    e.preventDefault();
  }

  if (status !== 0 && status !== 200) {
    return (
      <div>
        <button 
        className='btn btn-danger' 
        onClick={(e) => {handleClick(e)}}>
          Delete all comments
        </button>
        <p className='text-danger'>Something went wrong</p>
      </div>
    )
  }

  return (
    <button 
    className='btn btn-danger'
    onClick={(e) => {handleClick(e)}}>
      Delete all comments
    </button>
  )
}

function CommentsList(props) {
  return (
    <div className='bg-light rounded p-3 mb-3'>
      <h5 className='fw-bold'>Comments</h5>
      <hr></hr>
      <DeleteAllButton />
      <hr></hr>
      <dl className='list-group'>
        {
          props.comments.length ?
            // Show comments from post
            props.comments.map((comment) => (
              <div className='list-group-item' key={comment._id}>
                <dt><h6 className='fw-bold'>{comment.author}</h6></dt>
                <dd className='row'>
                  <div className='col-7'>
                    <p>{comment.content}</p>
                    <p className='text-muted'>Posted on {
                      new Date(comment.timestamp).toLocaleDateString('en-us', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    }</p>
                  </div>
                  <CommentButtons comment={comment} />
                </dd>
              </div>
          )) : (
            <p>There are no comments.</p>
          )
        }
      </dl>
    </div>
  );
}

export default CommentsList;