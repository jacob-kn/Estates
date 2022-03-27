import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr' // icons

function AddProperty() {
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    zipCode: '',
    Quadrant: '',
    bathrooms: '',
    bedrooms: '',
    type: '',
    furnished: '',
    price: '',
    imgPath: ''
  })

  const { city, 
          street, 
          zipCode, 
          Quadrant,    
          bathrooms,   
          bedrooms,   
          type,   
          furnished,   
          price,    
          imgPath
        } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    console.log(e.target.value)
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
      
    }))
  }

  const onSubmit = e => {
    var select = document.getElementById("Quadrant");
    console.log(select.value);
    const Quadrant = select.value;
    e.preventDefault()

    const postData = {
      city, 
      street, 
      zipCode, 
      Quadrant,    
      bathrooms,   
      bedrooms,   
      type,   
      furnished,   
      price,    
      imgPath
      }
      console.log(postData)
    
  }



  return (
    <>
      <section className='heading'>
        <h1>
          <GrAdd /> Add Post
        </h1>
        <p>Please add necessary fields </p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}><div className='form-group'>
            <input
              type='city'
              className='form-control'
              id='city'
              name='city'
              value={city}
              placeholder='Enter city'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='street'
              className='form-control'
              id='street'
              name='street'
              value={street}
              placeholder='Confirm street'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='zipCode'
              className='form-control'
              id='zipCode'
              name='zipCode'
              value={zipCode}
              placeholder='Enter your zipCode'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor ='Quadrant'>
              Choose a Quadrant
            </label>
            <select 
              type='Quadrant'
              className='form-control'
              name='Quadrant' 
              id='Quadrant'>
               <option value='NE'>NE</option>
               <option value="NW">NW</option>
               <option value="SE">SE</option>
               <option value="SW">SW</option>
            </select>

          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='bathrooms'
              name='bathrooms'
              value={bathrooms}
              placeholder='Enter your bathrooms'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='bedrooms'
              name='bedrooms'
              value={bedrooms}
              placeholder='Enter your bedrooms'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor ='Type'>
              Choose a Type
            </label>
            <select 
              type='Type'
              className='form-control'
              name='Type' 
              id='Type'>
               <option value='Residential'>Residential</option>
               <option value="Condo/Strata">Condo/Strata</option>
               <option value="Vacant Land">Vacant Land</option>
               <option value="Multi Family">Multi Family</option>
               <option value="Agriculture">Agriculture</option>
               <option value="Parking">Parking</option>
            </select>

          </div>
          <div className='form-group'>            
            <label htmlFor ='Furnished'>
              Furnished
            </label>
            <select 
              type='Furnished'
              className='form-control'
              name='Furnished' 
              id='Furnished'>
               <option value='Yes'>Yes</option>
               <option value="No">No</option>
               
            </select>
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='price'
              name='price'
              value={price}
              placeholder='Enter your price'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='File'
              className='form-control'
              id='imgPath'
              name='imgPath'
              value={imgPath}
              placeholder='Enter your imgPath'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddProperty