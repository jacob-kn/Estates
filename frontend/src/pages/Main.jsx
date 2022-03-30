import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropertyCard from '../components/PropertyCard.jsx'
import Filter from '../components/Filter'

function Main () {
  let module = require('./tmpProps.js')
  let tmpProps = module.tmpProps

  return (
    <>
      <section className='heading'>
        <h1>Real Estate Listings</h1>
      </section>

      <section className='content'>
        <div className='filter'>
          <Filter />
        </div>
        <div className='properties'>
          {tmpProps.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              browse={true}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Main
