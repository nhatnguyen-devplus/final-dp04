import Api from '@app/config/httpRequest'

export const getAllDaysOff = () => Api.get(`/dayoffs`)
