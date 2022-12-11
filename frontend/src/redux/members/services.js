import Api from '@app/config/httpRequest'

export const getAllUsers = () => Api.get(`/users`)
export const getUserById = (_id) => Api.get(`/users/me${_id}`)
