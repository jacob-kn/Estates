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
  })

  const { city, street,  zipCode } = formData

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


  //change text data
  const onChange = e => {
    setFormData({
      ...formData,[e.target.name]: e.target.value
    })
  };

  const onChangePhoto = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name); // setting the name  not the file   
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();  // set form data
    formData.append('city', city);
    formData.append('street', street);
    formData.append('zipCode', zipCode);
    console.log(formData)

    dispatch(addProperty(formData)) // send data to upload post

    // const postData = {
    //   city, 
    //   street, 
    //   zipCode, 
    //   }
    //   console.log(postData)
      
    // dispatch(addProperty(postData)) // send data to upload post
    
  }

  if (isLoading) { // for loading
    return <Spinner />
  }



  return (
    <div className='container'>
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
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default AddProperty