import axios from 'axios'

const API_URL = '/api/users/'

// Register buyer
const registerBuyer = async userData => {
  const response = await axios.post(API_URL + 'buyer', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Register seller
const registerSeller = async userData => {
  const response = await axios.post(API_URL + 'seller', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login as buyer
const loginBuyer = async userData => {
  const response = await axios.post(API_URL + 'buyer/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login as seller
const loginSeller = async userData => {
  const response = await axios.post(API_URL + 'seller/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerBuyer,
  registerSeller,
  loginBuyer,
  loginSeller,
  logout
}

export default authService
