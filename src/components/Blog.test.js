import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders correct content before show details is clicked', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'testing.com'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Title: test title Author: test author'
    )
})

test('renders correct content after show details is clicked', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'testing.com'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} toggleVisibility={mockHandler} />
    )

    const button = component.getByText('View Details')
    console.log('the buttons text content', button.textContent)
    fireEvent.click(button)
    console.log('the buttons text content', button.textContent)


    expect(mockHandler.mock.calls).toHaveLength(1)
})