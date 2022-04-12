import axios from 'axios'
var querystring = require('querystring');

const API_URL = '/api/properties'

// AddProperty
const addProperty = async (propertyData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Added this which is good but not super nessasary 
    },
    data: {
      foo: 'bar', WASD: 1234
    }
  }
//   axios.post(API_URL, querystring.stringify({ foo: 'bar' }),config);
  console.log(propertyData)
  console.log("city: " + propertyData.get('city'))
  console.log("street: " + propertyData.get('street'))
  console.log("zipCode: " + propertyData.get('zipCode'))

  const formData = new FormData();
  formData.append('city', "YO");
//   const response = await axios.post(API_URL, {
//       lol: 49
//   }, config)
  
//   const response = await axios.post(API_URL, formData, config)

axios({
    method: "post",
    url: API_URL,
    data: propertyData,
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Added this which is good but not super nessasary 
      }
})
    .then(function (response) {
    //handle success
    console.log(response);
    })
    .catch(function (response) {
    //handle error
    console.log(response);
    });
}

const addPropertyService = {
    addProperty
}
  
export default addPropertyService

