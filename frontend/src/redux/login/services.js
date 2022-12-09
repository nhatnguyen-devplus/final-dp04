import Api from '@app/config/httpRequest'

export const postLogin = (data) => Api.post(`/auth/login`, data.data)

export const checkToken = () => Api.get(`/users/me`)
