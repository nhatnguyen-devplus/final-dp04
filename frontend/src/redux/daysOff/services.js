import Api from '@app/config/httpRequest'

export const getAllDaysOff = (payload) => Api.get(`/dayoffs?from=${payload.from}&to=${payload.to}`)
