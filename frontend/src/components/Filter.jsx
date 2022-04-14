import './styles/filter.css'

import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'

var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

function numFormatter (num) {
  if (num > 999 && num < 1000000) {
    return '$' + (num / 1000).toFixed(0) + 'K' // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(0) + 'M' // convert to M for number from > 1 million
  } else if (num < 900) {
    return '$' + num // if value < 1000, nothing to do
  }
}

const priceMarks = [
  {
    value: 0,
    scaledValue: 0,
    label: numFormatter(0)
  },
  {
    value: 25,
    scaledValue: 100000,
    label: numFormatter(100000)
  },
  {
    value: 50,
    scaledValue: 250000,
    label: numFormatter(250000)
  },
  {
    value: 75,
    scaledValue: 500000,
    label: numFormatter(500000)
  },
  {
    value: 100,
    scaledValue: 1000000,
    label: numFormatter(1000000)
  },
  {
    value: 125,
    scaledValue: 2000000,
    label: numFormatter(2000000)
  },
  {
    value: 150,
    scaledValue: 10000000,
    label: numFormatter(10000000)
  },
  {
    value: 175,
    scaledValue: 100000000,
    label: 'Unlimited'
  }
]

const scaleValues = valueArray => {
  return [scale(valueArray[0]), scale(valueArray[1])]
}

const scale = value => {
  if (value === undefined) {
    return undefined
  }
  const previousMarkIndex = Math.floor(value / 25)
  const previousMark = priceMarks[previousMarkIndex]
  const remainder = value % 25
  if (remainder === 0) {
    return previousMark.scaledValue
  }
  const nextMark = priceMarks[previousMarkIndex + 1]
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25
  return remainder * increment + previousMark.scaledValue
}

export { scale }

function Filter (props) {
  const {
    filterState,
    price,
    handleFilter,
    handleFilterChange,
    handlePriceChange,
    handleClear
  } = props

  const { quad, bathrooms, bedrooms, type, furnished } = filterState

  const displayPrices = () => {
    if (price[1] === 175) {
      // 175 is unlimited
      return `${priceFormatter.format(scale(price[0]))} - Unlimited`
    } else {
      return `${priceFormatter.format(
        scale(price[0])
      )} - ${priceFormatter.format(scale(price[1]))}`
    }
  }

  return (
    <div className='filter-wrapper'>
      <div className='filter-component-wrapper'>
        <FormControl sx={{ n: 1, minWidth: 80 }}>
          <InputLabel id='select-quad-label'>Quad</InputLabel>
          <Select
            labelId='select-quad-label'
            id='select-quad'
            name='quad'
            value={quad}
            onChange={handleFilterChange}
            label='Quad'
          >
            <MenuItem value=''>
              <em>Any</em>
            </MenuItem>
            <MenuItem value={'NE'}>NE</MenuItem>
            <MenuItem value={'NW'}>NW</MenuItem>
            <MenuItem value={'SE'}>SE</MenuItem>
            <MenuItem value={'SW'}>SW</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='filter-component-wrapper'>
        <FormControl sx={{ n: 1, minWidth: 150 }}>
          <InputLabel id='select-bedrooms-label'># of Bedrooms</InputLabel>
          <Select
            labelId='select-bedrooms-label'
            id='select-bedrooms'
            name='bedrooms'
            value={bedrooms}
            onChange={handleFilterChange}
            label='# of Bedrooms'
          >
            <MenuItem value=''>
              <em>Any</em>
            </MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'1+'}>1+</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'2+'}>2+</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'3+'}>3+</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'4+'}>4+</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'5+'}>5+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='filter-component-wrapper'>
        <FormControl sx={{ n: 1, minWidth: 160 }}>
          <InputLabel id='select-bathrooms-label'># of Bathrooms</InputLabel>
          <Select
            labelId='select-bathrooms-label'
            id='select-bathrooms'
            name='bathrooms'
            value={bathrooms}
            onChange={handleFilterChange}
            label='# of Bathrooms'
          >
            <MenuItem value=''>
              <em>Any</em>
            </MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'1+'}>1+</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'2+'}>2+</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'3+'}>3+</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'4+'}>4+</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'5+'}>5+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='filter-component-wrapper'>
        <FormControl sx={{ n: 1, minWidth: 130 }}>
          <InputLabel id='select-type-label'>Type</InputLabel>
          <Select
            labelId='select-type-label'
            id='select-type'
            name='type'
            value={type}
            onChange={handleFilterChange}
            label='Type'
          >
            <MenuItem value=''>
              <em>Any</em>
            </MenuItem>
            <MenuItem value={'Residential'}>Residential</MenuItem>
            <MenuItem value={'Condo/Strata'}>Condo/Strata</MenuItem>
            <MenuItem value={'Vacant Land'}>Vacant Land</MenuItem>
            <MenuItem value={'Recreational'}>Recreational</MenuItem>
            <MenuItem value={'Multi Family'}>Multi Family</MenuItem>
            <MenuItem value={'Agriculture'}>Agriculture</MenuItem>
            <MenuItem value={'Parking'}>Parking</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='filter-component-wrapper'>
        <FormControl sx={{ n: 1, minWidth: 120 }}>
          <InputLabel id='select-furnished-label'>Furnished</InputLabel>
          <Select
            labelId='select-furnished-label'
            id='select-furnished'
            name='furnished'
            value={furnished}
            onChange={handleFilterChange}
            label='Furnished'
          >
            <MenuItem value=''>
              <em>Any</em>
            </MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box sx={{ marginTop: 1.5 }}>
        <label htmlFor='price-slider'>Price Range: {displayPrices()}</label>
        <Slider
          id='price-slider'
          name='price'
          value={price}
          min={0}
          step={1}
          max={175}
          scale={scaleValues}
          getAriaValueText={numFormatter}
          valueLabelFormat={numFormatter}
          marks={priceMarks}
          onChange={handlePriceChange}
          disableSwap
          aria-labelledby='price-slider'
        />
      </Box>

      <Stack direction='row' spacing={2} justifyContent='center'>
        <div>
          <button type='submit' className='btn' onClick={handleFilter}>
            Filter Properties
          </button>
        </div>
        <div>
          <button className='btn' onClick={handleClear}>
            Clear Filters
          </button>
        </div>
      </Stack>
    </div>
  )
}

export default Filter
