import {
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Typography,
  CardMedia,
  IconButton,
  CardActionArea,
  CardActions,
  Box
} from '@mui/material'

import { FaHeart, FaRegHeart, FaBath, FaBed, FaCouch } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import { Currency } from 'react-intl-number-format'

import { useSelector } from 'react-redux'

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
    </Card>
  )
}

export default PropertyCard
