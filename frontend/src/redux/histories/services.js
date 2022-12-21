import Api from '@app/config/httpRequest'

export const getHistories = (id) => Api.get(`/histories/${id}`)
