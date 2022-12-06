import Api from '@app/config/httpRequest'

export const getAllUsers = async () => {
  return Api.get(`/users`)
}
