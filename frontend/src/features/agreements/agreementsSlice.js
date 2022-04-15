import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import agreementsService from './agreementsService'

const initialState = {
  agreement: null,
  curAgreement: null,
  userAgreements: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Add Agreement
export const addAgreement = createAsyncThunk(
  'agreements/add-agreement',
  async (agreement, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await agreementsService.addAgreement(agreement, token)
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

// Get agreement by id
export const getAgreement = createAsyncThunk(
  'agreements/get-agreement',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await agreementsService.getAgreement(id, token)
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

// Accept agreement
export const acceptAgreement = createAsyncThunk(
  'agreements/accept-agreement',
  async (data, thunkAPI) => {
    try {
      const { id, name } = data
      const token = thunkAPI.getState().auth.user.token
      return await agreementsService.acceptAgreement(id, name, token)
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

// Reject agreement
export const rejectAgreement = createAsyncThunk(
  'agreements/reject-agreement',
  async (data, thunkAPI) => {
    try {
      const { id, name } = data
      const token = thunkAPI.getState().auth.user.token
      return await agreementsService.rejectAgreement(id, name, token)
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

// Get user's agreements
export const getUserAgreements = createAsyncThunk(
  'agreements/user/get-agreements',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await agreementsService.getUserAgreements(token)
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
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(addAgreement.pending, state => {
        state.isLoading = true
      })
      .addCase(addAgreement.fulfilled, (state, action) => {
        state.agreement = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addAgreement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAgreement.pending, state => {
        state.isLoading = true
      })
      .addCase(getAgreement.fulfilled, (state, action) => {
        state.curAgreement = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getAgreement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(acceptAgreement.pending, state => {
        state.isLoading = true
      })
      .addCase(acceptAgreement.fulfilled, (state, action) => {
        state.curAgreement = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(acceptAgreement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(rejectAgreement.pending, state => {
        state.isLoading = true
      })
      .addCase(rejectAgreement.fulfilled, (state, action) => {
        state.curAgreement = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(rejectAgreement.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserAgreements.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserAgreements.fulfilled, (state, action) => {
        state.userAgreements = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getUserAgreements.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = agreementsSlice.actions
export default agreementsSlice.reducer
