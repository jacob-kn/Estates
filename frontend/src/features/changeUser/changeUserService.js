import axios from 'axios'

const API_URL = '/api/users/'

// Change email
const udpateEmail = async (email, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'email',
    data: {
      email
    },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Change password
const updatePassword = async (password, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'password',
    data: {
      password
    },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Change company
const updateCompany = async (company, token) => {
  const response = await axios({
    method: 'put',
    url: API_URL + 'company',
    data: {
      company
    },
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

// Delete user
const deleteUser = async token => {
  const response = await axios({
    method: 'delete',
    url: API_URL,
    headers: { Authorization: 'Bearer ' + token }
  })

  return response.data
}

const changeUserService = {
  udpateEmail,
  updatePassword,
  updateCompany,
  deleteUser
}

export default changeUserService
