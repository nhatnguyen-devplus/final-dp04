import Api from '@app/config/httpRequest'

export const postLogin = (data) => Api.postBasic(`/auth/login`, data.data)

export const postLoginGoogle = () => Api.post(`/auth/login`)

export const checkToken = () => Api.get(`/users/me`)
