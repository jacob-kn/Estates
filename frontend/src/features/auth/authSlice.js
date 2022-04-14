import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import changeUserService from '../changeUser/changeUserService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register buyer
export const registerBuyer = createAsyncThunk(
  'auth/register-buyer',
  async (user, thunkAPI) => {
    try {
      return await authService.registerBuyer(user)
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

// Register seller
export const registerSeller = createAsyncThunk(
  'auth/register-seller',
  async (user, thunkAPI) => {
    try {
      return await authService.registerSeller(user)
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

// Login as buyer
export const loginBuyer = createAsyncThunk(
  'auth/login-buyer',
  async (user, thunkAPI) => {
    try {
      return await authService.loginBuyer(user)
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

// Login as seller
export const loginSeller = createAsyncThunk(
  'auth/login-seller',
  async (user, thunkAPI) => {
    try {
      return await authService.loginSeller(user)
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

// Change email
export const updateEmail = createAsyncThunk(
  'user/change/email',
  async (email, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeUserService.updateEmail(email, token)
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

// Change password
export const updatePassword = createAsyncThunk(
  'user/change/password',
  async (password, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeUserService.updatePassword(password, token)
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

// Change company
export const updateCompany = createAsyncThunk(
  'user/change/company',
  async (company, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeUserService.updateCompany(company, token)
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

// Add comment
export const addComment = createAsyncThunk(
  'user/buyer/add-comment',
  async (data, thunkAPI) => {
    try {
      const { comment, rid } = data
      const token = thunkAPI.getState().auth.user.token
      return await changeUserService.addComment(comment, rid, token)
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

// Delete user
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await changeUserService.deleteUser(token)
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

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerBuyer.pending, state => {
        state.isLoading = true
      })
      .addCase(registerBuyer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerBuyer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(registerSeller.pending, state => {
        state.isLoading = true
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginBuyer.pending, state => {
        state.isLoading = true
      })
      .addCase(loginBuyer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginBuyer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginSeller.pending, state => {
        state.isLoading = true
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
      .addCase(updateEmail.pending, state => {
        state.isLoading = true
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.email = action.payload.email
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePassword.pending, state => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCompany.pending, state => {
        state.isLoading = true
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.company = action.payload.company
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addComment.pending, state => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.comments = action.payload.comments
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
