import Api from '@app/config/httpRequest'

export const getDataSheet = (data) => Api.post(`/sheet`, data)
