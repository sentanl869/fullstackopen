import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setBlogs(await blogService.getAll())
      setUsername('')
      setPassword('')
      setMessage({
        content: 'Login success',
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        content: 'Wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setBlogs([])
      setMessage({
        content: 'Logout success',
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        content: 'Some wrong happened',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({
        content: `A new blog ${title} by ${author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        content: 'Wrong addition',
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const addBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged-in
          <button onClick={handleLogout}>logout</button>
        </p>
        {addBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <>
      <Notification message={message} />
      {user === null
        ? loginForm()
        : blogForm()
      }
    </>
  )
}

export default App