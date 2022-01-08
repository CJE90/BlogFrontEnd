import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setBlogs(await blogService.getAll())
      displayMessage('Log in Successful')
    } catch (exception) {
      displayMessage('Wrong Credentials')
    }

  }

  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
    displayMessage('Session Cleared')
  }



  const userInfo = () => {
    return (
      <div>
        <p> {user.name} is logged in <button onClick={logOut}>Log out</button></p >
      </div>

    )
  }
  const addBlog = async (blogObject) => {
    //event.preventDefault()

    try {
      const response = await blogService.create(blogObject)
      console.log(response)
      setBlogs(blogs.concat(response))
      setMessage(`New blog added \nTitle: ${blogObject.title}\nAuthor: ${blogObject.author}`)

    } catch (exception) {
      setMessage('new blog not added')
    }

  }
  const blogsForm = () => {
    return (
      <Togglable buttonLabel="Create New Blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const blogsInfo = () => {
    return (<>
      <h2>Blogs</h2>
      {userInfo()}
      {blogsForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      {console.log("tried to load blogs")}
    </>)
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to the application</h2>
        <form onSubmit={handleLogin}>
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
    <>
      <Notification className='error' message={message} />
      {user === null ? loginForm() : blogsInfo()}
    </>

  )
}


export default App