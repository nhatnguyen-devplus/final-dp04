import Api from '@app/config/httpRequest'

export const postNewPassword = (data) => Api.post(`/auth/change-password`, data)
