import Api from '@app/config/httpRequest'

export const getNotifications = () => Api.get(`/notification`)
export const seenNotifications = (_id) => Api.post(`/notification/${_id}`)
