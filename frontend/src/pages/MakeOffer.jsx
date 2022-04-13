import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoDocumentTextOutline } from 'react-icons/io5'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


function MakeOffer () {
  let { id } = useParams()
  
  let module = require('./tmpProps.js')
  let tmpProps = module.tmpProps
  const property = tmpProps.filter(tmpProp => tmpProp._id == id)[0]

  const addrStr = `${property.street} ${property.quadrant}, ${property.city}`

  const [closingDay, setClosingDay] = useState(new Date())
  const [offerExpiration, setOfferExpiration] = useState(new Date())

  return (
    <>
      <section className='heading'>
        <h1>
          <IoDocumentTextOutline /> Make an Offer
        </h1>
      </section>

      <section className='form'>
        <form>
          <div className='form-group'>
            <label>Property Address</label>
            <input
              className='form-control'
              id='legal-name'
              name='legal-name'
              value={addrStr}
              readonly='readonly'
            />
          </div>
          <div className='form-group'>
            <label>Legal Name</label>
            <input
              className='form-control'
              id='legal-name'
              name='legal-name'
              placeholder='Enter your full legal name'
            />
          </div>
          <div className='form-group'>
            <label>Purchase Price</label>
            <input
              className='form-control'
              id='purchase-price'
              name='purchase-price'
              placeholder="Enter offering amount in CAD"
            />
          </div>
          <div className='form-group'>
            <label>Closing Day</label>
            <DatePicker 
              selected={closingDay}
              onChange={(date) => setClosingDay(date)}
            />
          </div>
          <div className='form-group'>
            <label>Offer Expiration</label>
            <DatePicker 
              selected={offerExpiration}
              onChange={(date) => setOfferExpiration(date)}
            />
          </div>
          <div className='form-group'>
            <label>Deposit</label>
            <input
              className='form-control'
              id='deposit'
              name='deposit'
              placeholder='Enter any amount in CAD'
            />
          </div>
          <div className='form-group noselect'>
            <label>
              Request Current Land Survey?
              <input
                type='checkbox'
                id='landSurveyRequestedCb'
                name='landSurveyRequested'
              />
            </label>
          </div>
          <div className='form-group'>
            <Link to={'/agreement'}> {/* placeholder */}
              <button type='submit' className='btn btn-block'>
                Sign Agreement
              </button>
            </Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default MakeOffer