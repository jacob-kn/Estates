import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import agreementsService from './agreementsService'

const initialState = {
  agreement: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Add Agreement
export const addAgreement = createAsyncThunk(
  'agreements/addAgreement',
  async (agreement, thunkAPI) => {
    try {
      return await agreementsService.addAgreement(agreement)
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

export const agreementsSlice = createSlice({
  name: 'agreements',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(addAgreement.pending, state => {
        state.isLoading = true
      })
      .addCase(addAgreement.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(addAgreement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = agreementsSlice.actions
export default agreementsSlice.reducer