import Api from '@app/config/httpRequest'

export const getPostData = () => {
  return Api.get(`/get-all-users`)
}
export const postPostData = (data) => {
  console.log(data)
  return Api.post(`/create-new-clinic`, data)
}
