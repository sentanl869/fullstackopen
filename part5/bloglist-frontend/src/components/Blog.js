import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogDetail = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.author}</div>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible ? blogDetail() : null}
    </div>
  )
}

export default Blog