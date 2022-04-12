import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import addPropertyService from './addPropertyService'

const initialState = {
    property: null,  //shouldn't need to store status of a post 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }


/**
 
pending: addProperties/addProperty/pending
fulfilled: addProperties/addProperty/fulfilled
rejected: addProperties/addProperty/rejected


 */


// Add Properties
export const addProperty = createAsyncThunk(
  'addProperties/addProperty',
  async (property, thunkAPI) => {
      
    console.log("city: " + property.get('city'))
    
    console.log("street: " + property.get('street'))
    
    console.log("zipCode: " + property.get('zipCode'))
    try {
      const token = thunkAPI.getState().auth.user.token
      return await addPropertyService.addProperty(property, token)
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addPropertySlice = createSlice({
  name: 'addProperties',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(addProperty.pending, state => {
        state.isLoading = true
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})


export const { reset } = addPropertySlice.actions
export default addPropertySlice.reducer
