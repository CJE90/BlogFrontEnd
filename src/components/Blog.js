import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeBlog = async () => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`
    const userResponse = window.confirm(message)
    if (userResponse) {
      const request = await blogService.remove(blog.id)
      console.log(request)
    }
  }

  const addLike = async () => {
    await blogService.update(blog.id, { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1, user: blog.user._id })
  }
  return (
    <div>
      < div style={hideWhenVisible} className={'blogDetails'} >
        <div style={blogStyle}>
          Title: {blog.title} Author: {blog.author} <button onClick={toggleVisibility}>View Details</button>
        </div>
      </div >
      <div style={showWhenVisible} className={'blogDetails'}>
        <div style={blogStyle}>
          Title: {blog.title} <button onClick={toggleVisibility}>Hide Details</button><br />
          Author: {blog.author}<br />
          Url: {blog.url}<br />
          Likes: {blog.likes} <button onClick={addLike}>Like</button><br />
          <button onClick={removeBlog}>Delete Blog</button>
        </div>
      </div>
    </div>
  )
}

export default Blog