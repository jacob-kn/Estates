import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertyService from './propertyService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  properties: [],
  propCount: null,
  curProp: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get properties by page
export const getProperties = createAsyncThunk(
  'properties/get-by-page',
  async (data, thunkAPI) => {
    try {
      const { page, body } = data
      return await propertyService.getProperties(page, body)
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

// Count properties
export const countProperties = createAsyncThunk(
  'properties/count',
  async (filter, thunkAPI) => {
    try {
      return await propertyService.countProperties(filter)
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

// Get property by id
export const getProperty = createAsyncThunk(
  'properties/get-current-property',
  async (id, thunkAPI) => {
    try {
      return await propertyService.getProperty(id)
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

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getProperties.pending, state => {
        state.isLoading = true
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.properties = action.payload
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(countProperties.pending, state => {
        state.isLoading = true
      })
      .addCase(countProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.propCount = action.payload.count
      })
      .addCase(countProperties.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProperty.pending, state => {
        state.isLoading = true
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.curProp = action.payload
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = propertySlice.actions
export default propertySlice.reducer
