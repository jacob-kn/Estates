import axios from 'axios'

const API_URL = '/api/properties/'

// Get all properties by page and sort order
const getProperties = async (page, body) => {
  const response = await axios({
    method: 'get',
    url: API_URL + page,
    data: {
      ...body
    }
  })

  return response.data
}

const propertyService = {
  getProperties
}

export default propertyService
