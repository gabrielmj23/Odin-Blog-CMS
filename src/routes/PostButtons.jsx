import { Link } from 'react-router-dom';

function PostButtons(props) {
  return (
    <div className='col-6 align-self-center'>
      <Link to={`/posts/${props.postId}`}>
        <button className='btn btn-success mx-3'>View post</button>
      </Link>
      <Link to={`/posts/${props.postId}/update`}>
        <button className='btn btn-primary'>Update post</button>
      </Link>
      <button className='btn btn-danger mx-3'>Delete post</button>
      <button className='btn' style={{
        backgroundColor: 'purple',
        color: 'white'
      }}>{
        props.visible ? (<span>Unpublish post</span>) : (<span>Publish post</span>)
      }</button>   
    </div>
  );
}

export default PostButtons;