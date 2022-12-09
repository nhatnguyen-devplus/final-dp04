import Api from '@app/config/httpRequest'

export const getAllUsers = () => Api.get(`/users`)
