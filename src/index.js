import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import App from './App';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import Posts from './routes/Posts';
import PostCreate from './routes/PostCreate';
import PostView from './routes/PostView';
import CommentEdit from './routes/CommentEdit';
import PostUpdate from './routes/PostUpdate';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<App />}>
          <Route index element={<Posts />} />
          <Route path='/posts/new' element={<PostCreate />} />
          <Route path='/posts/:postId'> 
            <Route index element={<PostView />} />
            <Route path='comments/:commentId' element={<CommentEdit />} />
          </Route>
          <Route path='/posts/:postId/update' element={<PostUpdate />} />
          <Route path='*' element={
              <main className='mt-5 text-center'>
                <h4>There's nothing here.</h4>
              </main>
            } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
