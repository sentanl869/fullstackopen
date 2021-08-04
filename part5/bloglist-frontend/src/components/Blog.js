import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetailVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = event => {
    event.preventDefault()
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = event => {
    event.preventDefault()
    removeBlog(blog)
  }

  const blogDetail = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLikes}>like</button>
      </div>
      <div>{blog.author}</div>
      <button onClick={handleRemove}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={blogDetailVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible ? blogDetail() : null}
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog