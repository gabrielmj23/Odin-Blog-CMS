import PostForm from './PostForm';

function PostCreate() {
  return (
    <div className='container-fluid mt-3'>
      <div className='row'>
        <div className='col-2'></div>

        <div className='col-8'>
          <h2 className='text-center mb-4'>Create Post</h2>
          <PostForm update={false}/>
        </div>

        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default PostCreate;