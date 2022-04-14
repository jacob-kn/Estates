import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sellerInfoService from './sellerInfoService'

const initialState = {
  seller: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getSeller = createAsyncThunk(
  'buyer/get-seller',
  async (id, thunkAPI) => {
    try {
      return await sellerInfoService.getSeller(id)
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

export const sellerInfoSlice = createSlice({
  name: 'sellerInfo',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getSeller.pending, state => {
        state.isLoading = true
      })
      .addCase(getSeller.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.seller = action.payload
      })
      .addCase(getSeller.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = sellerInfoSlice.actions
export default sellerInfoSlice.reducer
