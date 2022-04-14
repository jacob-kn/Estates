import {
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Typography,
  CardMedia,
  IconButton,
  createTheme,
  ThemeProvider,
  Button,
  CardActionArea,
  CardActions,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  typographyClasses
} from '@mui/material'

import {
  FaHeart,
  FaRegHeart,
  FaBath,
  FaBed,
  FaCouch,
  FaPen
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Currency } from 'react-intl-number-format'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

import {
  addToSavedProperties,
  removeFromSavedProperties,
  removeFromListings,
  updateListing
} from '../features/userProps/userPropsSlice'

const theme = createTheme({
  palette: {
    primary: { main: '#000' }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    button: {
      textTransform: 'none'
    }
  }
})

var stringToColour = function (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

function PropertyCard (props) {
  const dispatch = useDispatch()

  const { property, browse, saved } = props

  const imgs = property.imgPaths.map(
    imgPath => process.env.PUBLIC_URL + '/uploads/' + imgPath
  )

  const addrStr = `${property.street} ${property.quadrant}, ${property.city}`

  const { user } = useSelector(state => state.auth)

  // -- Save function ---

  const [isSaved, setIsSaved] = useState(saved)

  const handleSave = () => {
    if (!isSaved) {
      dispatch(addToSavedProperties(property._id))
      setIsSaved(true)
      toast.success('Property saved')
    } else {
      dispatch(removeFromSavedProperties(property._id))
      setIsSaved(false)
      toast.success('Property removed from saved')
    }
  }

  // --- Edit modal ---

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [formData, setFormData] = useState({
    city: property.city,
    street: property.street,
    zipCode: property.zipCode,
    Quadrant: property.quadrant,
    bathrooms: property.criteria.bathrooms,
    bedrooms: property.criteria.bedrooms,
    type: property.criteria.type,
    furnished: property.criteria.furnished,
    price: property.criteria.price
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

  const quadOpts = [
    { value: 'NE', label: 'NE' },
    { value: 'NW', label: 'NW' },
    { value: 'SE', label: 'SE' },
    { value: 'SW', label: 'SW' }
  ]

  const typeOpts = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Condo/Strata', label: 'Condo/Strata' },
    { value: 'Vacant Land', label: 'Vacant Land' },
    { value: 'Multi Family', label: 'Multi Family' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Parking', label: 'Parking' }
  ]

  const furnishedOpts = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSelect = (option, action) => {
    setFormData(prevState => ({
      ...prevState,
      [action.name]: option.value
    }))
  }

  const onSubmit = e => {
    const propData = {
      city,
      street,
      zipCode,
      Quadrant,
      bathrooms,
      bedrooms,
      type,
      furnished,
      price
    }
    const propId = property._id
    const data = { propId, body: propData }
    dispatch(updateListing(data))
    toast.success('Updated property')
  }

  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleConfirmOpen = () => {
    setConfirmOpen(true)
  }

  const handleConfirmClose = () => {
    setConfirmOpen(false)
  }

  const onRemove = () => {
    dispatch(removeFromListings(property._id))
    toast.success('Removed listing')
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: stringToColour(property.seller.email),
              '&:hover': { opacity: 0.7 }
            }}
            component={Link}
            to={'/user/' + property.seller.email}
          >
            {property.seller.email.charAt(0)}
          </Avatar>
        }
        title={
          <Link to={'/user/' + property.seller.email} className='greyHover'>
            {property.seller.isRealtor ? (
              <span style={{ fontWeight: 'bolder' }}>Realtor: </span>
            ) : null}
            {property.seller.email}
          </Link>
        }
        subheader={new Date(property.createdAt).toLocaleString('en-US')}
      />
      <CardActionArea component={Link} to={'/property/' + property._id}>
        <CardMedia
          component='img'
          image={imgs[0]}
          alt={imgs[0]}
          sx={{ maxHeight: '200px' }}
        />
        <h2 style={{ paddingTop: '10px', margin: 0 }}>
          <Currency locale='en-US' currency='USD'>
            {property.criteria.price}
          </Currency>
        </h2>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div className='largeLine'>
            <FaBath /> {property.criteria.bathrooms}
          </div>
          <div className='largeLine'>
            <FaBed /> {property.criteria.bedrooms}
          </div>
          <div className='largeLine'>
            <FaCouch /> {property.criteria.furnished ? 'Yes' : 'No'}
          </div>
        </Box>
        <CardContent sx={{ padding: '0 0 10px 0' }}>
          <Typography variant='body2' color='text.secondary'>
            {addrStr} <br /> {property.zipCode}
          </Typography>
        </CardContent>
      </CardActionArea>
      {browse && user && user.type === 'buyer' ? (
        <>
          <CardActions disableSpacing>
            <IconButton
              aria-label='add to saved properties'
              onClick={handleSave}
            >
              {isSaved ? <FaHeart /> : <FaRegHeart />}
            </IconButton>
          </CardActions>
        </>
      ) : null}
      {!browse && user && user.type === 'seller' ? (
        <>
          <CardActions sx={{ justifyContent: 'center' }}>
            <ThemeProvider theme={theme}>
              <Button
                variant='contained'
                startIcon={<FaPen />}
                onClick={handleClickOpen}
                aria-label='edit property'
              >
                <h4>Edit</h4>
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}
                fullWidth='md'
              >
                <DialogTitle>Edit your property</DialogTitle>
                <DialogContent>
                  <form onSubmit={onSubmit}>
                    <div className='form-group'>
                      <label htmlFor='city'>City</label>
                      <input
                        type='city'
                        className='form-control'
                        id='city'
                        name='city'
                        value={city}
                        placeholder={property.city}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='street'>Street</label>
                      <input
                        type='street'
                        className='form-control'
                        id='street'
                        name='street'
                        value={street}
                        placeholder={property.street}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='zipCode'>Zip Code</label>
                      <input
                        type='zipCode'
                        className='form-control'
                        id='zipCode'
                        name='zipCode'
                        value={zipCode}
                        placeholder={property.zipCode}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Quadrant'>Choose a Quadrant</label>
                      <Select
                        value={quadOpts.type}
                        name='Quadrant'
                        className='form-control'
                        options={quadOpts}
                        onChange={onSelect}
                        defaultValue={{
                          value: property.quadrant,
                          label: property.quadrant
                        }}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='bathrooms'>Bathrooms</label>
                      <input
                        type='number'
                        step='0.5'
                        min='0'
                        className='form-control'
                        id='bathrooms'
                        name='bathrooms'
                        value={bathrooms}
                        placeholder={property.criteria.bathrooms}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='bedrooms'>Bedrooms</label>
                      <input
                        type='number'
                        min='0'
                        className='form-control'
                        id='bedrooms'
                        name='bedrooms'
                        value={bedrooms}
                        placeholder={property.criteria.bedrooms}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Type'>Choose a Type</label>
                      <Select
                        value={typeOpts.value}
                        name='type'
                        className='form-control'
                        options={typeOpts}
                        onChange={onSelect}
                        defaultValue={{
                          value: property.criteria.type,
                          label: property.criteria.type
                        }}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Furnished'>Furnished</label>
                      <Select
                        value={furnishedOpts.value}
                        name='furnished'
                        className='form-control'
                        options={furnishedOpts}
                        onChange={onSelect}
                        defaultValue={
                          property.criteria.furnished
                            ? furnishedOpts[0]
                            : furnishedOpts[1]
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='price'>Price</label>
                      <input
                        type='number'
                        className='form-control'
                        step='1000'
                        min='0'
                        id='price'
                        name='price'
                        value={price}
                        placeholder={property.criteria.price}
                        onChange={onChange}
                      />
                    </div>

                    <div className='form-group'>
                      <button type='submit' className='btn btn-block'>
                        Submit
                      </button>
                    </div>
                  </form>

                  <button
                    className='btn btn-block'
                    style={{ backgroundColor: '#E23636', border: '0px' }}
                    onClick={handleConfirmOpen}
                  >
                    Remove property
                  </button>
                  <Dialog
                    open={confirmOpen}
                    onClose={handleConfirmClose}
                    maxWidth='xs'
                    fullScreen={fullScreen}
                    fullWidth='md'
                  >
                    <DialogTitle>{'Remove listing?'}</DialogTitle>
                    <DialogContent>
                      <p>This cannot be undone.</p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleConfirmClose}>No</Button>
                      <Button onClick={onRemove} autoFocus>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={onSubmit}>Submit</Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>
          </CardActions>
        </>
      ) : null}
    </Card>
  )
}

export default PropertyCard
