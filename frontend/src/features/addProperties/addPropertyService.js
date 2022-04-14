import axios from 'axios'

const API_URL = '/api/properties/'

// AddProperty
const addProperty = async (propertyData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Added this which is good but not super nessasary 
    },
    body: {
      foo: 'bar', WASD: 1234
    }
  }
  
  console.log(propertyData)
  console.log(propertyData.get('file'))
  console.log("city: " + propertyData.get('city'))
  console.log("street: " + propertyData.get('street'))
  console.log("zipCode: " + propertyData.get('zipCode'))
  console.log("Quadrant: " + propertyData.get('Quadrant'))
  console.log("bathrooms: " + propertyData.get('bathrooms'))
  console.log("bedrooms: " + propertyData.get('bedrooms'))
  console.log("type: " + propertyData.get('type'))
  console.log("furnished: " + propertyData.get('furnished'))
  console.log("price: " + propertyData.get('price'))
  const response = await axios.post(API_URL, propertyData, config)
  console.log(response.data)
  return response.data
}

const addPropertyService = {
    addProperty
}
  
export default addPropertyService

