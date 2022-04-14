import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userPropsReducer from '../features/userProps/userPropsSlice'
import propertyReducer from '../features/properties/propertySlice'
import propReducer from '../features/addProperties/addPropertySlice'
import agreementReducer from '../features/agreements/agreementsSlice'
import sellerInfoReducer from '../features/sellerInfo/sellerInfoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    userProps: userPropsReducer,
    addProperties: propReducer,
    addAgreement: agreementReducer,
    sellerInfo: sellerInfoReducer
  }
})
