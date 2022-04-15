import axios from 'axios'

const API_URL = '/api/fee/'

// Get fee
const getFee = async id => {
  const response = await axios({
    method: 'get',
    url: API_URL
  })

  return response.data
}

const feeService = {
  getFee
}

export default feeService
