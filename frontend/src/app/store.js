import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import propReducer from '../features/addProperties/addPropertySlice'
import agreementReducer from '../features/agreements/agreementsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addProperties: propReducer,
    addAgreement: agreementReducer
  }
})
