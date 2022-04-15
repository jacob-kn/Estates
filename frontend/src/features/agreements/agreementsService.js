import axios from 'axios'

const API_URL = '/api/agreements/'

// Add agreement
const addAgreement = async (agreementData, token) => {
  const response = await axios({
    method: 'post',
    url: API_URL,
    data: agreementData,
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Get agreement
const getAgreement = async (id, token) => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'agreement/' + id,
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Accept agreement
const acceptAgreement = async (id, name, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'accept/' + id,
    data: { sellerName: name },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Reject agreement
const rejectAgreement = async (id, name, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'reject/' + id,
    data: { sellerName: name },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Get user's agreements
const getUserAgreements = async token => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'user',
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

const agreementsService = {
  addAgreement,
  getAgreement,
  acceptAgreement,
  rejectAgreement,
  getUserAgreements
}

export default agreementsService
