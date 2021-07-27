import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ user, setUser ] = useState(null)
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

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        content: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
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

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setBlogs(await blogService.getAll())
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

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm 
        login={login}
      />
    </Togglable>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  const blogForm = () => (
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