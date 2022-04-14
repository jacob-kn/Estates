import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userPropsService from './userPropsService'

// Get saved from localStorage
const saved = JSON.parse(localStorage.getItem('saved'))

const initialState = {
  userProps: saved ? saved : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// --- Saved Property Reducers ---
export const getSavedProperties = createAsyncThunk(
  'buyer/saved-properties/get-all',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.getSavedProperties(token)
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

export const addToSavedProperties = createAsyncThunk(
  'buyer/saved-properties/add-property',
  async (propId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.addToSavedProperties(propId, token)
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

export const removeFromSavedProperties = createAsyncThunk(
  'buyer/saved-properties/remove-property',
  async (propId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.removeFromSavedProperties(propId, token)
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

// --- Listing Reducers ---

export const getListings = createAsyncThunk(
  'seller/listings/get-all',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.getListings(token)
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

export const removeFromListings = createAsyncThunk(
  'seller/listings/remove-property',
  async (propId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.removeFromListings(propId, token)
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

export const updateListing = createAsyncThunk(
  'seller/listings/update-listing',
  async (data, thunkAPI) => {
    try {
      const { propId, body } = data
      const token = thunkAPI.getState().auth.user.token
      return await userPropsService.updateListing(propId, body, token)
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

export const userPropsSlice = createSlice({
  name: 'userProps',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getSavedProperties.pending, state => {
        state.isLoading = true
      })
      .addCase(getSavedProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(getSavedProperties.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addToSavedProperties.pending, state => {
        state.isLoading = true
      })
      .addCase(addToSavedProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(addToSavedProperties.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeFromSavedProperties.pending, state => {
        state.isLoading = true
      })
      .addCase(removeFromSavedProperties.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(removeFromSavedProperties.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getListings.pending, state => {
        state.isLoading = true
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(getListings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeFromListings.pending, state => {
        state.isLoading = true
      })
      .addCase(removeFromListings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(removeFromListings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateListing.pending, state => {
        state.isLoading = true
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProps = action.payload
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = userPropsSlice.actions
export default userPropsSlice.reducer
