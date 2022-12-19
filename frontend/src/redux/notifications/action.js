import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  SEEN_NOTIFICATIONS,
  SEEN_NOTIFICATIONS_SUCCESS,
  SEEN_NOTIFICATIONS_FAILURE,
} from './constant'

export const getNotifications = () => ({
  type: GET_NOTIFICATIONS,
})

export const getNotificationsSuccsess = (data) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: data,
})

export const getNotificationsFailure = (error) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: error,
})

export const seenNotifications = (data) => ({
  type: SEEN_NOTIFICATIONS,
  payload: data,
})

export const seenNotificationsSuccsess = (data) => ({
  type: SEEN_NOTIFICATIONS_SUCCESS,
  payload: data,
})

export const seenNotificationsFailure = (error) => ({
  type: SEEN_NOTIFICATIONS_FAILURE,
  payload: error,
})
