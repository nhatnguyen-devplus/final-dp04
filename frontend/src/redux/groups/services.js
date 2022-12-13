import Api from '@app/config/httpRequest'

export const getAllGroups = () => Api.get(`/user-groups`)

export const getGroupById = (_id) => Api.get(`/user-groups/${_id}`)

export const postCreateGroup = (data) => Api.post(`/user-groups`, data)

export const updateGroup = (payload) => Api.post(`/user-groups/${payload.id}`, payload.data)

export const deleteGroup = (_id) => Api.delete(`/user-groups/${_id}`)
