import axios from 'axios'

export default axios.create({
    baseURL: process.env.SERVER_HOST,
    timeout: 1000,
})
