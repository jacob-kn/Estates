import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import feeService from './feeService'

const initialState = {
  fee: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getFee = createAsyncThunk('fee/get-fee', async (id, thunkAPI) => {
  try {
    return await feeService.getFee(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const feeSlice = createSlice({
  name: 'fee',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getFee.pending, state => {
        state.isLoading = true
      })
      .addCase(getFee.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.fee = action.payload[0].amount
      })
      .addCase(getFee.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = feeSlice.actions
export default feeSlice.reducer
