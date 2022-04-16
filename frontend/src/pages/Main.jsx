import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropertyCard from '../components/PropertyCard.jsx'
import Filter from '../components/Filter'
import Spinner from '../components/Spinner'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import { getSavedProperties } from '../features/userProps/userPropsSlice.js'
import {
  getProperties,
  countProperties,
  reset
} from '../features/properties/propertySlice.js'
import { scale } from '../components/Filter'

function Main () {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { properties, propCount, isLoading, isError, message } = useSelector(
    state => state.properties
  )
  const { userProps, isLoading: savedLoading } = useSelector(
    state => state.userProps
  )

  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({
    sort: '-createdAt',
    quad: '',
    bathrooms: '',
    bedrooms: '',
    type: '',
    furnished: ''
  })
  const { sort, quad, bathrooms, bedrooms, type, furnished } = filter
  const [price, setPrice] = useState([0, 175])

  const handleFilterChange = e => {
    setFilter(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const minDistance = 5

  const handlePriceChange = (e, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 175 - minDistance)
        setPrice([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setPrice([clamped - minDistance, clamped])
      }
    } else {
      setPrice(newValue)
    }
  }

  let finalFilter = {
    sort: '-createdAt',
    quad: '',
    bathrooms: '',
    bedrooms: '',
    type: '',
    furnished: '',
    minPrice: '',
    maxPrice: ''
  }

  let data = { page, body: finalFilter }

  const populateFinalFilter = () => {
    finalFilter.sort = sort
    finalFilter.quad = quad
    finalFilter.bathrooms = bathrooms
    finalFilter.bedrooms = bedrooms
    finalFilter.type = type
    finalFilter.furnished = furnished
    finalFilter.minPrice = scale(price[0])
    if (price[1] === 175) {
      // 175 is unlimited
      finalFilter.maxPrice = ''
    } else {
      finalFilter.maxPrice = scale(price[1])
    }
  }

  const dispatchGet = () => {
    populateFinalFilter()
    dispatch(getProperties(data))
    dispatch(countProperties(finalFilter))
  }

  const handleFilter = () => {
    dispatchGet()
    toast.success('Filtered properties')
  }

  const handleSortChange = e => {
    setFilter(prevState => ({
      ...prevState,
      sort: e.target.value
    }))
    toast.success('Sorted properties')
  }

  useEffect(() => {
    dispatchGet()
  }, [sort]) // when sort changes

  const handleClear = () => {
    setFilter(prevState => ({
      sort: prevState.sort,
      quad: '',
      bathrooms: '',
      bedrooms: '',
      type: '',
      furnished: ''
    }))
    setPrice([0, 175])

    finalFilter.sort = sort
    finalFilter.quad = ''
    finalFilter.bathrooms = ''
    finalFilter.bedrooms = ''
    finalFilter.type = ''
    finalFilter.furnished = ''
    finalFilter.minPrice = ''
    finalFilter.maxPrice = ''

    dispatch(getProperties(data))
    dispatch(countProperties(finalFilter))
    toast.success('Cleared filters')
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    populateFinalFilter()
    dispatch(getProperties(data))
    dispatch(countProperties(finalFilter))

    if (user && user.type === 'buyer') {
      dispatch(getSavedProperties())
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, message, user, page, dispatch])

  const pageCount = () => {
    return Math.ceil(propCount / 9)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const isSaved = propId => {
    for (const property of userProps) {
      if (property._id === propId) {
        return true
      }
    }
    return false
  }

  if (isLoading || savedLoading) {
    console.log(savedLoading)
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Real Estate Listings</h1>
      </section>

      <section className='content'>
        <div className='filter'>
          <Filter
            filterState={filter}
            price={price}
            handleFilter={handleFilter}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            handleClear={handleClear}
          />
        </div>
        <div className='sort'>
          <InputLabel id='select-sort-label'>Sort by:</InputLabel>
          <FormControl sx={{ mb: 2, minWidth: 120 }} size='small'>
            <Select
              labelId='select-sort-label'
              id='select-sort'
              name='sort'
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value={'-createdAt'}>Newest</MenuItem>
              <MenuItem value={'createdAt'}>Oldest</MenuItem>
              <MenuItem value={'price'}>Lowest price</MenuItem>
              <MenuItem value={'-price'}>Highest price</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='properties'>
          {properties.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              browse={true}
              saved={isSaved(property._id)}
            />
          ))}
        </div>
      </section>

      <Box display='flex' justifyContent='center' sx={{ margin: '50px 0' }}>
        <Pagination
          count={pageCount()}
          page={page ? page : 1}
          onChange={handlePageChange}
        />
      </Box>
    </>
  )
}

export default Main
