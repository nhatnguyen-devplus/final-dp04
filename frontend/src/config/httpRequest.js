import axios from 'axios'

const base = import.meta.env.VITE_APP_URL

const getHeaders = () => ({
  Accept: '*/*',
  'content-type': 'application/json',
  // Authorization: `Bearer`,
})

axios.interceptors.request.use(
  (config) => {
    const params = config.params || {}

    return {
      ...config,
      params,
    }
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

const getApi = (path, options = {}) =>
  axios.get(`${base}/${path.replace(/^\//, '')}`, {
    ...options,
    headers: getHeaders(),
  })

const postApi = (path, body, option = {}) =>
  axios.post(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
    headers: getHeaders(),
  })

const putApi = (path, body, option = {}) =>
  axios.put(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
    headers: getHeaders(),
  })

const deleteApi = (path, option = {}) =>
  axios.delete(`${base}/${path.replace(/^\//, '')}`, {
    ...option,
    headers: getHeaders(),
  })

const deleteMultipleApi = (path, data = {}) =>
  axios.delete(`${base}/${path.replace(/^\//, '')}`, {
    headers: getHeaders(),
    data,
  })

const postBasic = (path, body, option = {}) =>
  axios.post(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
  })

const getBasic = (path, option = {}) =>
  axios.get(`${base}/${path.replace(/^\//, '')}`, {
    ...option,
  })

const putBasic = (path, body, option = {}) =>
  axios.put(`${base}/${path.replace(/^\//, '')}`, body, {
    ...option,
  })

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  deleteMultipleApi,
  postBasic,
  getBasic,
  putBasic,
}

export default Api
