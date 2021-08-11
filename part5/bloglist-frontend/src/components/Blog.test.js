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
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
    )
  })

  test('renders content', () => {

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes 666')

  })

  test('click button to show detail', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent('likes 666')
  })

  test('like button click twice', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(1)

    fireEvent.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})