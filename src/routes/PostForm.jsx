import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostForm(props) {
  // For routing
  const params = useParams();
  const navigate = useNavigate();

  // States for post info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Save post info to state if updating
    if (props.update) {
      setTitle(props.post.title);
      setDescription(props.post.description);
      setBody(props.post.body);
      setVisible(props.post.visible);
    }
  }, [props])

  // Function to PUT or POST (update or create) through API
  const submitPost = async () => {
    const url = props.update ?
      `https://gabrielm-odin-blog-api.herokuapp.com/api/posts/${params.postId}` :
      'https://gabrielm-odin-blog-api.herokuapp.com/api/posts';

    const fetchBody = {
      title: title,
      description: description,
      body: body,
      visible: visible
    };

    try {
      // Perform fetch
      const response = await fetch(url, {
        method: props.update ? 'PUT' : 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchBody)
      });

      // Redirect to post list if successful
      if (response.status === 200) {
        return navigate('/');
      } else {
        // Get errors
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const handleSubmit = (e) => {
    setVisible(
      e.target.visible === 'on' ? true : false
    )
    submitPost();
    e.preventDefault();
  }

  return (
    <form className='form-control p-3' onSubmit={e => {handleSubmit(e)}}>
      <div className='form-group mb-3'>
        <label htmlFor='title'>Title: </label><br/>
        <input 
        id='title' 
        name='title' 
        className='p-1'
        style={{
          width: '75%'
        }}
        type='text'
        placeholder='Post title'
        required
        onChange={e => setTitle(e.target.value)}
        value={title}
        />
      </div>
      
      <div className='form-group mb-3'>
        <label htmlFor='description'>Description (max. 100 characters): </label><br/>
        <textarea
        id='content'
        name='content'
        style={{
          width: '100%'
        }}
        required
        onChange={e => setDescription(e.target.value)}
        value={description}
        ></textarea>
      </div>

      <div className='form-group mb-3'>
        <label htmlFor='body'>Body: </label><br/>
        <textarea
        id='body'
        name='content'
        style={{
          width: '100%'
        }}
        required
        onChange={e => setBody(e.target.value)}
        value={body}
        ></textarea>
      </div>

      <div className='form-check form-switch mb-3'>
        <input
        className='form-check-input'
        type='checkbox'
        id='visible'
        checked={visible}
        />
        <label className='form-check-label' htmlFor='visible'>Visible (published)</label>
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

export default PostForm;