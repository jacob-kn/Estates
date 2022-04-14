import axios from 'axios'

const API_URL = '/api/properties/'

// Get all properties by page and sort order
const getProperties = async (page, body) => {
  const response = await axios({
    method: 'post',
    url: API_URL + 'page/' + page,
    data: body
  })

  return response.data
}

const countProperties = async filter => {
  const response = await axios({
    method: 'post',
    url: API_URL + 'count',
    data: filter
  })

  return response.data
}

const getProperty = async id => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'property/' + id
  })

  return response.data
}

const propertyService = {
  getProperties,
  countProperties,
  getProperty
}

export default propertyService
