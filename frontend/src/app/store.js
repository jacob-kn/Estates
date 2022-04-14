import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userPropsReducer from '../features/userProps/userPropsSlice'
import propertyReducer from '../features/properties/propertySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    userProps: userPropsReducer
  }
})
