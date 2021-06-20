const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('returned of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has id property', async () => {
    const blogs = await helper.blogsInDb()

    blogs.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of new blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'Just test add',
      author: 'sentanl869',
      url: 'https://justfortest.com/',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('Just test add')
  })

  test('a blog whitout likes', async () => {
    const newBlog = {
      title: 'Just test blog whitout likes',
      author: 'sentanl869',
      url: 'https://justfortestblogwhitoutlikes.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const targetBlog = blogs.find(blog => blog.title === newBlog.title)
    expect(targetBlog.likes).toBe(0)
  })

  test('add a blog without title', async () => {
    const newBlog = {
      author: 'sentanl869',
      url: 'https://justfortestblogwhitouttitle.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('add a blog whitout url', async () => {
    const newBlog = {
      title: 'Just test blog whitout url',
      author: 'sentanl869',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updates of a blog', () => {
  test('updates blog likes value', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = blogToUpdate.likes + 1

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body
    expect(returnedBlog.likes).toBe(blogToUpdate.likes)

    const blogsAtEnd = await helper.blogsInDb()
    const targetBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(targetBlog.likes).toBe(blogToUpdate.likes)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})