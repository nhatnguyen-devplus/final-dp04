import Api from '@app/config/httpRequest'

export const getAllUsers = () => Api.get(`/users`)
export const getMe = () => Api.get(`/users/me`)
export const getUserById = (_id) => Api.get(`/users/${_id}`)
export const updateUser = (payload) => Api.post(`/users/${payload._id}`, payload.data)
export const createUser = (data) => Api.post(`/auth/register`, data)
export const deleteUser = (_id) => Api.delete(`/users/${_id}`)
