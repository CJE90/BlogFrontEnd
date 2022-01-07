import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('null')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setBlogs(await blogService.getAll())
      // const blogsData = await blogService.getAll()
      //console.log(blogsData)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const userInfo = () => {
    //blogService.getAll().then((blogs) => setBlogs(blogs))

    return <p> {user.name} is logged in</p >
  }

  // useEffect(() => {
  //   // (async () => {
  //   //   const blogs = await blogService.getAll()
  //   //   setBlogs(blogs)
  //   // })()

  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])



  const blogsInfo = () => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    return (<>
      <h2>Blogs</h2>
      {userInfo()}
      {/* {blogsForm()} */}
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
    user === null ? loginForm() : blogsInfo()
  )
}

export default App