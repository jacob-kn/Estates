import axios from 'axios'

const API_URL = '/api/users/seller/'

// Get buyer's saved properties
const getSeller = async id => {
  const response = await axios({
    method: 'get',
    url: API_URL + 'info/' + id
  })

  return response.data
}

const userPropsService = {
  getSeller
}

export default userPropsService
