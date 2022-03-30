import "./styles/filter.css"

import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

function Filter() {
  
  const [quad, setQuad] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');
  const [type, setType] = React.useState('');
  const [furnished, setFurnished] = React.useState('');
  const [price, setPrice] = React.useState('');

  const onQuadChange = (event) => {
    setQuad(event.target.value);
  }
  const onBedroomChange = (event) => {
    setBedrooms(event.target.value);
  }
  const onBathroomChange = (event) => {
    setBathrooms(event.target.value);
  }
  const onTypeChange = (event) => {
    setType(event.target.value);
  }
  const handleFurnished = (event) => {
    setFurnished(event.target.value);
  }
  const onPriceChange = (event) => {
    setPrice(event.target.value);
  }
  const filterProperties = () => {
    // query database
  }

  return (
    <div className="filter-wrapper">
      <div className="filter-component-wrapper">
        <FormControl sx={{ n: 1, minWidth: 80}}>
          <InputLabel id="select-quad-label">Quad</InputLabel>
          <Select 
            labelId="select-quad-label"
            id="select-quad"
            value={quad}
            onChange={onQuadChange}
            label="Quad"
          >
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value={"NE"}>NE</MenuItem>
            <MenuItem value={"NW"}>NW</MenuItem>
            <MenuItem value={"SE"}>SE</MenuItem>
            <MenuItem value={"SW"}>SW</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-component-wrapper">
        <FormControl sx={{ n: 1, minWidth: 150}}>
          <InputLabel id="select-bedrooms-label"># of Bedrooms</InputLabel>
          <Select 
            labelId="select-bedrooms-label"
            id="select-bedrooms"
            value={bedrooms}
            onChange={onBedroomChange}
            label="# of Bedrooms"
          >
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"1+"}>1+</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"2+"}>2+</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"3+"}>3+</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"4+"}>4+</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"5+"}>5+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-component-wrapper">
        <FormControl sx={{ n: 1, minWidth: 160}}>
          <InputLabel id="select-bathrooms-label"># of Bathrooms</InputLabel>
          <Select 
            labelId="select-bathrooms-label"
            id="select-bathrooms"
            value={bathrooms}
            onChange={onBathroomChange}
            label="# of Bathrooms"
          >
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"1+"}>1+</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"2+"}>2+</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"3+"}>3+</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"4+"}>4+</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"5+"}>5+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-component-wrapper">
        <FormControl sx={{ n: 1, minWidth: 130}}>
          <InputLabel id="select-type-label">Type</InputLabel>
          <Select 
            labelId="select-type-label"
            id="select-type"
            value={type}
            onChange={onTypeChange}
            label="Type"
          >
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value={"Residential"}>Residential</MenuItem>
            <MenuItem value={"Condo/Strata"}>Condo/Strata</MenuItem>
            <MenuItem value={"Vacant Land"}>Vacant Land</MenuItem>
            <MenuItem value={"Recreational"}>Recreational</MenuItem>
            <MenuItem value={"Multi Family"}>Multi Family</MenuItem>
            <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
            <MenuItem value={"Parking"}>Parking</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-component-wrapper">
        <FormControl sx={{ n: 1, minWidth: 120}}>
        <InputLabel id="select-furnished-label">Furnished</InputLabel>
          <Select 
            labelId="select-furnished-label"
            id="select-furnished"
            value={furnished}
            onChange={handleFurnished}
            label="Furnished"
          >
            <MenuItem value=""><em>Any</em></MenuItem>
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filter-component-wrapper">
        <TextField 
          id="outlined-basic" 
          label="Price" 
          value={price}
          onChange={onPriceChange}
          sx={{ n: 1, width: 140}}
        />
      </div>
      <button type='submit' className='btn' onClick={filterProperties}>
        Filter Properties
      </button>
    </ div>
  )
}

export default Filter;