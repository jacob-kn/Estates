import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import { Container, Grid, Box, Stack, Avatar, IconButton } from '@mui/material'
import { Currency } from 'react-intl-number-format'
import { Link } from 'react-router-dom'
import { FaBath, FaBed, FaCouch, FaHeart, FaRegHeart } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { getProperty, reset } from '../features/properties/propertySlice.js'
import {
  getSavedProperties,
  addToSavedProperties,
  removeFromSavedProperties
} from '../features/userProps/userPropsSlice.js'

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

function Property () {
  let { id } = useParams()

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { curProp: property, isLoading, isError, message } = useSelector(
    state => state.properties
  )
  const { userProps } = useSelector(state => state.userProps)

  const [imgs, setImgs] = useState(null)

  const getImgs = () => {
    let imgPaths = property.imgPaths

    const imgArr = imgPaths.map(imgPath => ({
      original: imgPath,
      thumbnail: imgPath
    }))

    setImgs(imgArr)
  }

  const addrStr = () => {
    return `${property.street} ${property.quadrant}, ${property.city}`
  }

  // --- Save function ---

  const [isSaved, setIsSaved] = useState(() => {
    for (const property of userProps) {
      if (property._id === id) {
        return true
      }
    }
    return false
  })

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

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getProperty(id))

    if (user && user.type === 'buyer') {
      dispatch(getSavedProperties())
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, message, user, id, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {!property ? (
        <p>Property does not exist</p>
      ) : (
        <>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            {!imgs && getImgs()}
            <ImageGallery items={imgs} />
          </Container>

          <Grid container spacing={2} sx={{ paddingBottom: '50px' }}>
            <Grid item xs={12} sm={8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'space-evenly',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '0 1rem 1rem 1rem'
                }}
              >
                {user && user.type === 'buyer' ? (
                  <div style={{ position: 'relative' }}>
                    <IconButton
                      aria-label='add to saved properties'
                      sx={{ position: 'absolute', top: '10px', right: '0px' }}
                      onClick={handleSave}
                    >
                      {isSaved ? <FaHeart /> : <FaRegHeart />}
                    </IconButton>
                  </div>
                ) : null}
                <h1 style={{ paddingTop: '10px', margin: 0 }}>
                  <Currency locale='en-US' currency='USD'>
                    {property.criteria.price}
                  </Currency>
                </h1>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px'
                  }}
                >
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
                <p>
                  {addrStr()} <br /> {property.zipCode}
                </p>
                <p>
                  <strong>Type:</strong> {property.criteria.type}
                </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link to={'/user/' + property.seller._id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    '&:hover': {
                      boxShadow: '1px 1px 3px #333'
                    },
                    padding: '10px'
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: stringToColour(property.seller.email) }}
                    component={Link}
                    to={'/user/' + property.seller._id}
                  >
                    {property.seller.email.charAt(0)}
                  </Avatar>
                  <Stack>
                    <p>{property.seller.email}</p>
                    <div>
                      {property.seller.isRealtor ? (
                        <p>
                          <strong>Company:</strong> {property.seller.company}
                        </p>
                      ) : null}
                    </div>
                  </Stack>
                </Box>
              </Link>
              {user && user.type === 'buyer' ? (
                <Link to={'/property/' + property._id + '/make-offer'}>
                  <button
                    type='submit'
                    className='btn btn-block'
                    style={{ marginTop: 15 }}
                  >
                    Make an Offer
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Property
