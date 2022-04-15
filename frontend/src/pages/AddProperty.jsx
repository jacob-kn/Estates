import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GrAdd } from 'react-icons/gr' // icons
import { addProperty, reset } from '../features/addProperties/addPropertySlice'
import { getFee } from '../features/fee/feeSlice'
import Spinner from '../components/Spinner'
import { Currency } from 'react-intl-number-format'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button
} from '@mui/material'

function AddProperty () {
  const [file, setFile] = useState('')
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
    price: ''
  })

  const {
    city,
    street,
    zipCode,
    Quadrant,
    bathrooms,
    bedrooms,
    type,
    furnished,
    price
  } = formData

  const { user } = useSelector(
    // get user information
    state => state.auth
  )
  const { property, isLoading, isError, isSuccess, message } = useSelector(
    state => state.addProperties
  )
  const { fee } = useSelector(state => state.fee)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!file) {
      setPreview(undefined)
    } else {
      setPreview(
        <>
          {file.map(fil => (
            <div>
              <img
                style={{ width: '100%' }}
                src={URL.createObjectURL(fil)}
                alt=''
              />
            </div>
          ))}
        </>
      )
    }

    if (isError) {
      // error in handling things if not all fields are filled
      toast.error(message)
    }

    if (!user) {
      // shouldn't need this part but good to have
      navigate('/login')
    }

    if (isSuccess) {
      // everything worked
      toast('Post Uploaded')
      navigate('/') // go to dashboard
    }

    dispatch(getFee())
  }, [
    file,
    user,
    property,
    isLoading,
    isError,
    isSuccess,
    message,
    dispatch,
    navigate
  ])

  useEffect(() => {
    return () => {
      dispatch(reset()) // only reset on unmount
    }
  }, [])

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onChangePhoto = e => {
    var files = e.target.files
    var tempfiles = [files[0]]
    for (var i = 1; i < files.length; i++) {
      tempfiles.push(files[i])
    }
    setFile(tempfiles)
  }

  const onSubmit = async () => {
    handlePaymentClose()
    var select = document.getElementById('Quadrant')
    const Quadrant = select.value
    var select = document.getElementById('Type')
    const type = select.value
    var select = document.getElementById('Furnished')
    const furnished = select.value

    if (
      !(
        city &&
        street &&
        zipCode &&
        bathrooms !== '' &&
        bedrooms !== '' &&
        price !== '' &&
        file
      )
    ) {
      toast.error('Please fill all fields')
    }

    // e.preventDefault()
    const formData = new FormData() // set form data
    file.forEach(fil => {
      formData.append('HousePhotos', fil)
    })
    formData.append('city', city)
    formData.append('street', street)
    formData.append('zipCode', zipCode)
    formData.append('Quadrant', Quadrant)
    formData.append('bathrooms', bathrooms)
    formData.append('bedrooms', bedrooms)
    formData.append('type', type)
    formData.append('furnished', furnished)
    formData.append('price', price)

    dispatch(addProperty(formData)) // send data to upload post
  }

  const [paymentOpen, setPaymentOpen] = useState(false)

  const handlePaymentOpen = () => {
    setPaymentOpen(true)
  }

  const handlePaymentClose = () => {
    setPaymentOpen(false)
  }

  if (isLoading) {
    // for loading
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
        <form>
          <div className='form-group'>
            <label htmlFor='Quadrant'>City</label>
            <input
              type='city'
              className='form-control'
              id='city'
              name='city'
              value={city}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Quadrant'>Street</label>
            <input
              type='street'
              className='form-control'
              id='street'
              name='street'
              value={street}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Quadrant'>ZipCode</label>
            <input
              type='zipCode'
              className='form-control'
              id='zipCode'
              name='zipCode'
              value={zipCode}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Quadrant'>Quadrant</label>
            <select
              type='Quadrant'
              className='form-control'
              name='Quadrant'
              id='Quadrant'
            >
              <option value='NE'>NE</option>
              <option value='NW'>NW</option>
              <option value='SE'>SE</option>
              <option value='SW'>SW</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='Quadrant'>Bathrooms</label>
            <input
              type='number'
              step='0.5'
              min='0'
              className='form-control'
              id='bathrooms'
              name='bathrooms'
              value={bathrooms}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Quadrant'>Bedrooms</label>
            <input
              type='number'
              className='form-control'
              min='0'
              id='bedrooms'
              name='bedrooms'
              value={bedrooms}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Type'>Choose a Type</label>
            <select type='Type' className='form-control' name='Type' id='Type'>
              <option value='Residential'>Residential</option>
              <option value='Condo/Strata'>Condo/Strata</option>
              <option value='Vacant Land'>Vacant Land</option>
              <option value='Multi Family'>Multi Family</option>
              <option value='Agriculture'>Agriculture</option>
              <option value='Parking'>Parking</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='Furnished'>Furnished</label>
            <select
              type='Furnished'
              className='form-control'
              name='Furnished'
              id='Furnished'
            >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='Furnished'>Enter your price</label>
            <input
              type='number'
              className='form-control'
              step='1000'
              id='price'
              min='0'
              name='price'
              value={price}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Furnished'>Images</label>
            <input
              className='form-control'
              type='file'
              accept='.png, .jpeg, .jpg'
              id='customFile'
              name='customFile'
              multiple
              onChange={onChangePhoto}
            />
          </div>
        </form>

        <button onClick={handlePaymentOpen} className='btn btn-block'>
          Submit
        </button>

        <Dialog open={paymentOpen} onClose={handlePaymentClose} maxWidth='xs'>
          <DialogTitle>{'Pay fee?'}</DialogTitle>
          <DialogContent>
            Pay{' '}
            <strong>
              <Currency locale='en-US' currency='USD'>
                {fee}
              </Currency>
            </strong>
            to list your property.
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePaymentClose}>No</Button>
            <Button onClick={onSubmit} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* display preview of upload */}
        <label className='custom-file-label' htmlFor='customFile'></label>
        {preview}
      </section>
    </>
  )
}

export default AddProperty
