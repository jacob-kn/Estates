import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropertyCard from '../components/PropertyCard.jsx'

function SavedProperties () {
  let module = require('./tmpProps.js')
  let tmpProps = module.tmpProps.slice(2, 5)

  return (
    <>
      <section className='heading'>
        <h1>Saved Properties</h1>
      </section>

      <section className='content'>
        <div className='properties'>
          {tmpProps.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>
    </>
  )
}

export default SavedProperties
