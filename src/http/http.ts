import axios, { type AxiosInstance } from 'axios'

const _default: AxiosInstance = axios.create({})

_default.interceptors.request.use(
  (config) => {
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  })

_default.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export default _default
