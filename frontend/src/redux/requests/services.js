import Api from '@app/config/httpRequest'

export const getAllRequests = () => Api.get(`/logoff`)
export const getRequestById = (_id) => Api.get(`/logoff/${_id}`)
export const createRequest = (data) => Api.post(`/logoff`, data)
export const updateRequest = (payload) => Api.post(`/logoff/${payload.id}`, payload.values)
