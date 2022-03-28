import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentButtons from "./CommentButtons";

function DeleteAllButton(props) {
  const params = useParams();
  const [status, setStatus] = useState(0);

  // Function to delete all comments
  const handleClick = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}/comments`;

    // Fetch API 
    // Authorization not implemented yet
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

  if (status !== 0 && status !== 200) {
    return (
      <div>
        <button 
        className='btn btn-danger' 
        onClick={() => handleClick()}>
          Delete all comments
        </button>
        <p className='text-danger'>Something went wrong</p>
      </div>
    )
  }

  return (
    <button className='btn btn-danger'>Delete all comments</button>
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