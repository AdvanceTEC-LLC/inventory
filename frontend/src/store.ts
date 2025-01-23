import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from './reducers/notificationsReducer'
import projectReducer from './reducers/projectReducer'

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    project: projectReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
