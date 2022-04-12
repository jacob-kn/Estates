import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import propReducer from '../features/addProperties/addPropertySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addProperties: propReducer
  }
})
