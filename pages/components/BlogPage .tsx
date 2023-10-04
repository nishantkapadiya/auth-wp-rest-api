import React from 'react'

const BlogPage = () => {
    const storedToken = sessionStorage.getItem('jwt_token');
  return (
      <div>BlogPage 
      <br />
          {storedToken}
    </div>
  )
}

export default BlogPage 