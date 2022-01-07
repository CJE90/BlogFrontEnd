import axios from 'axios'
const baseUrl = '/api/blogs'

const login = async credentials => {
    console.log("these are the read in credentials", credentials);

    const response = await axios.post(baseUrl, credentials)
    return response.data
}
export default { login }