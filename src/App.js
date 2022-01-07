import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }, [])

  const sayClick = (event) => {
    event.preventDefault()
    console.log("Click")
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to the application</h2>
        <form onSubmit={sayClick}>
          <div>
            Username
            <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    // <div>
    //   <h2>blogs</h2>
    //   {blogs.map(blog =>
    //     <Blog key={blog.id} blog={blog} />
    //   )}
    // </div>
    loginForm()
  )
}

export default App