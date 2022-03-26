import React from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import { Container, Grid, Box, Avatar, IconButton } from '@mui/material'
import { Currency } from 'react-intl-number-format'
import { Link } from 'react-router-dom'
import { FaBath, FaBed, FaCouch, FaRegHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Property () {
  let { id } = useParams()

  const auth = useSelector(state => state.auth)
  const user = auth.user

  // tmp get images
  let module = require('./tmpProps.js')
  let tmpProps = module.tmpProps

  const property = tmpProps.filter(tmpProp => tmpProp._id == id)[0]

  let imgPaths = property.imgPaths

  const imgs = imgPaths.map(imgPath => ({
    original: process.env.PUBLIC_URL + imgPath,
    thumbnail: process.env.PUBLIC_URL + imgPath
  }))
  // end tmp get images

  const addrStr = `${property.street} ${property.quadrant}, ${property.city}`

  return (
    <>
      <Container>
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
                >
                  <FaRegHeart />
                </IconButton>
              </div>
            ) : null}
            <h1 style={{ paddingTop: '10px', margin: 0 }}>
              <Currency locale='en-US' currency='USD'>
                {property.criteria.price}
              </Currency>
            </h1>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
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
              {addrStr} <br /> {property.zipCode}
            </p>
            <p>
              <strong>Type:</strong> {property.criteria.type}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to={'/user/' + property.seller.email}>
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
              <Avatar component={Link} to={'/user/' + property.seller.email}>
                {property.seller.email.charAt(0)}
              </Avatar>
              {property.seller.email}
            </Box>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Property
