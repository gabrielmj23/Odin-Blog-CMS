import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  // State for user info
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  // Function to sign up user on form submission
  const signupUser = async () => {
    // Show error if password and confirmation don't match
    if (password !== confirmation) {
      setErrors([{msg: 'Password and confirmation do not match.'}]);
      return;
    }

    // Fetch info
    const url = 'https://gabrielm-odin-blog-api.herokuapp.com/api/signup';
    const fetchBody = {
      username: username,
      password: password
    };

    try {
      // Perform fetch to API for user creation
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
      });

      const data = await response.json();

      // Sign up successful, redirect to login page
      if (response.status === 200) {
        return navigate('/login');
      } else {
        // Show error messages
        setErrors(data.errors);
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  const handleSubmit = (e) => {
    signupUser();
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
            <h3 className='mb-3'>Sign Up</h3>
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

            <div className='form-group mb-3'>
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

            <div className='form-group mb-4'>
              <label htmlFor='confirmation'>Confirm your password:</label><br/>
              <input
              id='confirmation'
              name='confirmation'
              type='password'
              placeholder='Confirmation'
              className='p-1'
              autoComplete='off'
              required
              onChange={e => setConfirmation(e.target.value)}
              value={confirmation}
              />
            </div>

            <button className='btn btn-primary mb-2' type='submit'>Sign up</button>
            {
              errors.length > 0 &&
                (
                  <ul>
                    {errors.map((error, index) => (
                      <li className='text-danger' key={index}>{error.msg}</li>
                    ))
                    }
                  </ul>
                )
            }
            <p>Already have an account? <Link to='/login'>Log in</Link>.</p>
          </form>
        </div>

        <div className='col-4'></div>
      </div>
    </div>
  )
}

export default SignUp;