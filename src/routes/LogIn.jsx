import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate();

  // User state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to log user in on form submission
  const loginUser = async () => {
    // Fetch info
    const url = 'https://gabrielm-odin-blog-api.herokuapp.com/api/login';
    const fetchBody = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchBody)
      });

      const data = await response.json();

      // Log in successful
      if (response.status === 200) {
        setError('');
        localStorage.setItem('user', JSON.stringify({
          username: data.user.username,
          token: data.token
        }));
        navigate('/');
      } else {
        // Show error message
        setError(data.message);
      }
      return false;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const handleSubmit = (e) => {
    loginUser();
    e.preventDefault();
  }

  return (
    <div className='container vh-100' style={{
      backgroundColor: '#0aa2c0',
      minWidth: '100vw'
    }}>
      <div className='row vh-100 align-items-center'>
        <div className='col-4'></div>

        <div className='col-4'>
          <form className='form-control text-center p-4' onSubmit={(e) => {handleSubmit(e)}}>
            <h1 className='fw-bold mb-3'>Odin Blog CMS</h1>
            <hr/>
            <h3 className='mb-3'>Log In</h3>
            <div className='form-group mb-3'>
              <label htmlFor='username'>Username:</label><br/>
              <input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              className='p-1'
              required
              onChange={e => setUsername(e.target.value)}
              value={username}
              />
            </div>

            <div className='form-group mb-4'>
              <label htmlFor='password'>Password:</label><br/>
              <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='p-1'
              autoComplete='off'
              required
              onChange={e => setPassword(e.target.value)}
              value={password}
              />
            </div>
            <button className='btn btn-primary mb-2' type='submit'>Log in</button>
            {
              error.length > 0 &&
                (<p className='text-danger'>{error}</p>)
            }
            <p>Don't have an account? <Link to='/signup'>Sign up</Link>.</p>
          </form>
        </div>

        <div className='col-4'></div>
      </div>
    </div>
  )
}

export default LogIn;