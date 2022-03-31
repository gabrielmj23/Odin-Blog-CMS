import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';

function PostUpdate() {
  const params = useParams();
  const [status, setStatus] = useState(0);
  const [post, setPost] = useState({});

  useEffect(() => {
    // Fetch post info to fill post form
    const fetchPost = async () => {
      const url = `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors'
        });
        const data = await response.json();

        // Save post data in state
        setStatus(response.status);
        setPost(data.post);
      } catch (err) {
        console.log('Error: ', err);
      }
    }

    fetchPost();
  }, [params.postId]);

  return (
    <div className='container-fluid mt-3'>
      <div className='row'>
        <div className='col-2'></div>

        <div className='col-8'>
          {
            status === 200 ? 
              (
                <div>
                    <h2 className='text-center mb-4'>Update Post</h2>
                    <PostForm update={true} post={post} />
                </div>
              ) :
              status === 0 ?
                (
                  <p className='text-center text-primary'>Loading...</p>
                ) :
                (
                  <p className='text-center text-danger'>Post not found</p>
                )
          }
        </div>

        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default PostUpdate;