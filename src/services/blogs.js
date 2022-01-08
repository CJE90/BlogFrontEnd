import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  console.log('making request for blogs')

  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.get(baseUrl, config)
  console.log('this is the request', request)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

export default { getAll, setToken, create }