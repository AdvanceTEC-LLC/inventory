import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { NotificationStatus, NotificationType } from '../types/notification'

const initialState: NotificationType[] = []

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        id: number
        title?: string
        message?: string | string[]
        status?: NotificationStatus
        symbol?: boolean
        border?: boolean
        closable?: boolean
      }>
    ) => {
      const notification = {
        id: action.payload.id,
        title: action.payload.title,
        message: action.payload.message,
        status: action.payload.status ?? 'default',
        symbol: action.payload.symbol ?? true,
        border: action.payload.border ?? false,
        closable: action.payload.closable ?? false,
      }

      state.push(notification)
    },
    clearNotification: (state, action: PayloadAction<number>) => {
      return state.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { showNotification, clearNotification } =
  notificationsSlice.actions

let timeoutIds: Record<number, NodeJS.Timeout> = {}

export const notifyWithTimeout = (
  notification: {
    title?: string
    message?: string | string[]
    status?: NotificationStatus
    symbol?: boolean
    border?: boolean
    closable?: boolean
  },
  timeInSeconds = 5
) => {
  return (dispatch: AppDispatch, getState: Function) => {
    const id = getState().notifications.length + 1

    const notificationWithId = {
      id,
      ...notification,
    }

    // Dispatch the notification
    dispatch(showNotification(notificationWithId))

    // Set a new timeout to clear the notification
    timeoutIds[id] = setTimeout(() => {
      dispatch(clearNotification(id))
      delete timeoutIds[id] // Clean up timeout after clearing
    }, timeInSeconds * 1000)
  }
}

export default notificationsSlice.reducer
