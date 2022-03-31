import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostButtons from './PostButtons';

function ListGroup(props) {
  // Data is fetching
  if (props.data.length < 1) {
    return (
      <p className='text-primary'>Loading...</p>
    );
  }

  // No posts are found
  if (props.status === 404) {
    return (
      <div className='list-group-item'>
        <p className='fw-bold text-danger'>{props.data.message}</p>
      </div>
    );
  } else {
    // Return list of posts
    return (
      <dl className='list-group mt-3 text-start'>
        {
          props.data.posts.map((post) => (
            <div className='list-group-item' key={post._id}>
              <dt>
                <h5 className='fw-bold'>{post.title}</h5>
              </dt>
              <dd className='row'>
                <div className='col-6'>
                  <p>{post.description}</p>
                  <p className='text-muted'>Posted on {
                    new Date(post.timestamp).toLocaleDateString('en-us', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  }</p>
                </div>
                <PostButtons post={post}/>
              </dd>
            </div>
          ))
        }
      </dl>
    )
  }
}

function Posts() {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState('');

  useEffect(() => {
    // Get posts from API
    const url = 'https://gabrielm-odin-blog-api.herokuapp.com/api/posts';

    const fetchPosts = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors'
        });
        const data = await response.json();

        // Update component state
        setStatus(response.status);
        setData(data);
      } catch (err) {
        console.log('Error: ', err);
      }
    }

    fetchPosts();
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-1'></div>

        <div className='col-10 text-center'>
          <h3>Welcome, {JSON.parse(localStorage.getItem('user')).username}!</h3>
          <h5>Here are your posts</h5>
          <div className='text-end' style={{width: '92%'}}>
            <Link to={`/posts/new`}>
              <button className='btn btn-info mt-4 fw-bold p-2'>Write a new post</button>
            </Link>
          </div>
          <ListGroup status={status} data={data} />
        </div>

        <div className='col-1'></div>
      </div>
    </div>
  )
}

export default Posts;