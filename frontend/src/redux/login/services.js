import Api from '@app/config/httpRequest'

export const postLogin = (data) => {
  return Api.post(`/auth/login`, data.data)
}

export const checkToken = async () => {
  return Api.get(`/users`)
}
