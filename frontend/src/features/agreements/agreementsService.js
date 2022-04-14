import axios from 'axios'

const API_URL = '/api/agreements/'

// Add agreement
const addAgreement = async (agreementData) => {
  const response = await axios.post(API_URL, agreementData)

  return response.data
}

const agreementsService = {
    addAgreement,
}
  
export default agreementsService

