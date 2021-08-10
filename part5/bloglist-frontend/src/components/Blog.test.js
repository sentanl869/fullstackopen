import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

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

  test('renders content', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog key={blog.id} blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes 666')

  })

  test('click button to show detail', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog key={blog.id} blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent('likes 666')
  })
})