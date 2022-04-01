import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import checkLogin from '../checkLogin';

function SignUp() {
  const navigate = useNavigate();

  // State for user info
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Send to home page if user is already logged in
    if (checkLogin) {
      return navigate('/');
    }
  })

  // Function to sign up user on form submission
  const signupUser = async () => {

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