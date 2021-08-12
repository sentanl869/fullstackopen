import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'testing of forms title' }
  })
  fireEvent.change(author, {
    target: { value: 'testing of forms author' }
  })
  fireEvent.change(url, {
    target: { value: 'http://test.of.forms/title' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing of forms author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.of.forms/title')
})