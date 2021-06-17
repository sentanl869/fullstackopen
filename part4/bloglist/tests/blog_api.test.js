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

  blogs.map(blog => {
    expect(blog.likes).toBeDefined()
    if (blog.title === 'Just test blog whitout likes') {
      expect(blog.likes).toBe(0)
    }
  })
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

afterAll(async () => {
  mongoose.connection.close()
})