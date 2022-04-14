import axios from 'axios'

const API_URL = '/api/users/'

// --- Saved Property Services ---

// Get buyer's saved properties
const getSavedProperties = async token => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'buyer/saved-properties',
    headers: { Authorization: 'Bearer ' + token }
  })

  if (response.data) {
    localStorage.setItem('saved', JSON.stringify(response.data))
  }

  return response.data
}

// Add to buyer's saved properties
const addToSavedProperties = async (propId, token) => {
  const response = await axios({
    method: 'post',
    url: API_URL + 'buyer/saved-properties/' + propId,
    headers: { Authorization: 'Bearer ' + token }
  })

  if (response.data) {
    localStorage.setItem('saved', JSON.stringify(response.data))
  }

  return response.data
}

// remove from buyer's saved properties
const removeFromSavedProperties = async (propId, token) => {
  const response = await axios({
    method: 'delete',
    url: API_URL + 'buyer/saved-properties/' + propId,
    headers: { Authorization: 'Bearer ' + token }
  })

  if (response.data) {
    localStorage.setItem('saved', JSON.stringify(response.data))
  }

  return response.data
}

// --- Listing Services ---

// Get seller's listings
const getListings = async token => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'seller/listings',
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Remove from seller's listings
const removeFromListings = async (propId, token) => {
  const response = await axios({
    method: 'delete',
    url: API_URL + 'seller/listings/' + propId,
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Update seller's listing
const updateListing = async (propId, body, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'seller/listings/' + propId,
    data: {
      ...body
    },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

const userPropsService = {
  getSavedProperties,
  addToSavedProperties,
  removeFromSavedProperties,
  getListings,
  removeFromListings,
  updateListing
}

export default userPropsService
