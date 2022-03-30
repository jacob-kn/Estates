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
  useMediaQuery
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
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Select from 'react-select'

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

function PropertyCard (props) {
  const { property, browse } = props

  const imgs = property.imgPaths.map(
    imgPath => process.env.PUBLIC_URL + imgPath
  )

  const addrStr = `${property.street} ${property.quadrant}, ${property.city}`

  // Randomize avatar colour
  const avatarColours = ['#ffc3a0', '#848463', 'fb968a', '#a0c5c4', '#86664b']
  const randomAvColour =
    avatarColours[Math.floor(Math.random() * avatarColours.length)]

  const auth = useSelector(state => state.auth)
  const user = auth.user

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

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

  const {
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
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ]

  const onChange = e => {
    console.log(e.target.value)
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    var select = document.getElementById('Quadrant')
    console.log(select.value)
    const Quadrant = select.value
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
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: randomAvColour, '&:hover': { opacity: 0.7 } }}
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
            <IconButton aria-label='add to saved properties'>
              <FaRegHeart />
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
                        value={quadOpts.value}
                        name='Quadrant'
                        className='form-control'
                        options={quadOpts}
                        defaultValue={{
                          value: property.quadrant,
                          label: property.quadrant
                        }}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='number'
                        className='form-control'
                        id='bathrooms'
                        name='bathrooms'
                        value={bathrooms}
                        placeholder={property.criteria.bathrooms}
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
                        placeholder={property.criteria.bedrooms}
                        onChange={onChange}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Type'>Choose a Type</label>
                      <Select
                        value={typeOpts.value}
                        name='Type'
                        className='form-control'
                        options={typeOpts}
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
                        name='Furnished'
                        className='form-control'
                        options={furnishedOpts}
                        defaultValue={
                          property.criteria.furnished
                            ? furnishedOpts[0]
                            : furnishedOpts[1]
                        }
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='number'
                        className='form-control'
                        id='price'
                        name='price'
                        value={price}
                        placeholder={property.criteria.price}
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

                    <div className='form-group'>
                      <button
                        className='btn btn-block'
                        style={{ backgroundColor: '#E23636', border: '0px' }}
                      >
                        Remove property
                      </button>
                    </div>
                  </form>
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
