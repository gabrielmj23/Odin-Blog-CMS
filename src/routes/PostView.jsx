import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from './CommentsList';

function PostView() {
  const params = useParams();
  const [status, setStatus] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch post info from API
    const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}`;

    const fetchPost = async () => {
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

    fetchPost();
  }, [params.postId]);

  if (data.length < 1) {
    // Still fetching data
    return (
      <h5 className='text-primary text-center'>Loading...</h5>
    );
  } 
  else if (status === 404) {
    // Invalid post ID
    return (
      <h5 className='text-warning text-center'>{data.message}</h5>
    )
  } 
  else {
    // Return post
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'></div>

          <div className='col-8'>
            <div className='bg-light rounded p-3 mb-4'>
              <h2 className='text-center fw-bold'>{data.post.title}</h2>
              <h5 className='text-center'>By {data.post.author}</h5>
              <hr></hr>
              <p className='mb-3'>{data.post.body}</p>
              <p className='text-muted'>Posted on {
                new Date(data.post.timestamp).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }</p>
            </div>
            <CommentsList comments={data.post.comments}/>
          </div>

          <div className='col-2'></div>
        </div>
      </div>
    )
  }
}

export default PostView;