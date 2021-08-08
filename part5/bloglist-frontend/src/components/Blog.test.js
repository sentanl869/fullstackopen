import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'http://test.url.com',
    likes: 666,
    user: {
      username: 'test_username',
      name: 'test_user_name'
    },
  }

  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).toHaveTextContent(
    blog.author
  )
  expect(component.container).not.toHaveTextContent(
    blog.url
  )
  expect(component.container).not.toHaveTextContent(
    'likes 666'
  )

})