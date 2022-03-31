import { useState } from 'react';
import { Link } from 'react-router-dom';

function PostButtons(props) {
  // State to keep http responses from fetch operations
  const [status, setStatus] = useState(0);

  // Function to perform post deletion
  const deletePost = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${props.post._id}`;

    // Fetch API to delete post
    // Authorization not implemented yet
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      });
      const status = response.status;
      setStatus(status);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // Function to change post visibility
  const changeVisible = async () => {
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${props.post._id}`;
    const body = {
      title: props.post.title,
      description: props.post.description,
      body: props.post.body,
      visible: !props.post.visible,
      author: props.post.author
    }

    // Fetch API to update post
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(body)
      });
      const status = response.status;
      setStatus(status);
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  return (
    <div className='col-6'>
      <div className='align-self-center'>
        <Link to={`/posts/${props.post._id}`}>
          <button className='btn btn-success mx-3'>View post</button>
        </Link>
        <Link to={`/posts/${props.post._id}/update`}>
          <button className='btn btn-primary'>Update post</button>
        </Link>
        <button 
        className='btn btn-danger mx-3'
        onClick={() => {deletePost()}}>
          Delete post
        </button>
        <button 
        className='btn' 
        style={{
          backgroundColor: 'purple',
          color: 'white'
        }}
        onClick={() => {changeVisible()}}>
          {
          props.post.visible ? (<span>Unpublish post</span>) : (<span>Publish post</span>)
          }
        </button>
      </div>
      <div className='text-center'>
        {
          (status !== 0 && status !== 200) ? 
            ( <p className='text-danger'>Operation failed.</p> ) : 
            (status === 200) ? 
              window.location.reload(false) : 
              null
        }
      </div>
    </div>
  );
}

export default PostButtons;