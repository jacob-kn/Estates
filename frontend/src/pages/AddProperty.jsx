import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GrAdd } from 'react-icons/gr' // icons
import { addProperty, reset } from '../features/addProperties/addPropertySlice'
import Spinner from '../components/Spinner'
import axios from 'axios';

function AddProperty() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose a File'); // saves file name in onChangePhoto but not used currently
  const [preview, setPreview] = useState()

  
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
        } = formData

  const { user } = useSelector( // get user information
    state => state.auth
  )
  const { property , isLoading, isError, isSuccess, message } = useSelector(
    state => state.addProperties
  )

        
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      setFilename('Choose a File') // set the current file name back if not file
    }else{
      setPreview(URL.createObjectURL(file)) // for setting a preview of the photo
    }

    if (isError) {   // error in handling things if not all fields are filled
      toast.error(message)
    }

    if (!user) {   // shouldn't need this part but good to have
      navigate('/login')
    }

    if (isSuccess ) {  // everything worked
      toast('Post Uploaded')
      navigate('/') // go to dashboard
    }

    return () => {
      dispatch(reset()) // reset the variables
    }
  }, [file, user, property, isLoading, isError, isSuccess, message, dispatch, navigate])


  const onChange = e => {
    setFormData({
      ...formData,[e.target.name]: e.target.value
    })
  };

  const onChangePhoto = e => {
    console.log(e.target.files)
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);  // setting the name  not the file   
  };

  const onSubmit = async e => {
    var select = document.getElementById("Quadrant");
    const Quadrant = select.value;
    var select = document.getElementById("Type");
    const type = select.value;
    var select = document.getElementById("Furnished");
    const furnished = select.value;
    e.preventDefault();
    const formData = new FormData();  // set form data
    formData.append('file', file);
    console.log("file: " + formData.get('file'))
    formData.append('city', city);
    console.log("city: " + formData.get('city'))
    formData.append('street', street);
    console.log("street: " + formData.get('street'))
    formData.append('zipCode', zipCode);
    console.log("zipCode: " + formData.get('zipCode'))
    formData.append('Quadrant', Quadrant);
    console.log("Quadrant: " + formData.get('Quadrant'))
    formData.append('bathrooms', bathrooms);
    console.log("bathrooms: " + formData.get('bathrooms'))
    formData.append('bedrooms', bedrooms);
    console.log("bedrooms: " + formData.get('bedrooms'))
    formData.append('type', type);
    console.log("type: " + formData.get('type'))
    formData.append('furnished', furnished);
    console.log("furnished: " + formData.get('furnished'))
    formData.append('price', price);
    console.log("price: " + formData.get('price'))


    dispatch(addProperty(formData)) // send data to upload post

    // const postData = {
    //   file,
    //   city, 
    //   street, 
    //   zipCode, 
    //   Quadrant,    
    //   bathrooms,   
    //   bedrooms,   
    //   type,   
    //   furnished,   
    //   price,   
    //   }
    //   console.log(postData)
      
    // dispatch(addProperty(postData)) // send data to upload post
    
  }

  if (isLoading) { // for loading
    return <Spinner />
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
              className='form-control'
              type="file" 
              accept=".png, .jpeg, .jpg"
              id='customFile'
              name='customFile'
              onChange={onChangePhoto}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

            {/* display preview of upload */}
            <label className='custom-file-label' htmlFor='customFile'>
            <h2>{filename}</h2>
          </label>    
          <img style={{ width: '100%' }} src = {preview} alt='' />
        </form>
      </section>
    </>
  )
}

export default AddProperty