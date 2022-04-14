import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoDocumentTextOutline } from 'react-icons/io5'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


function MakeOffer () {
  let { id } = useParams()

  const auth = useSelector(state => state.auth)
  const user = auth.user
  
  let module = require('./tmpProps.js')
  let tmpProps = module.tmpProps
  const property = tmpProps.filter(tmpProp => tmpProp._id == id)[0]

  const addrStr = `${property.street} ${property.quadrant}, ${property.city}`

  const [closingDate, setClosingDate] = useState(new Date())
  const [offerExpiration, setOfferExpiration] = useState(new Date())
  const [formData, setFormData] = useState({
    buyerName: '',
    purchasePrice: '',
    deposit: '',
    landSurveyRequested: false,
  })

  const {
    buyerName,
    purchasePrice,
    deposit,
    landSurveyRequested,
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const onSubmit = async e => {
    const agreementData = new FormData(); // set form data
    agreementData.append('propertyId', property._id);
    agreementData.append('sellerId', property.seller._id);
    agreementData.append('buyerId', user._id)
    agreementData.append('buyerName', formData.buyerName);
    agreementData.append('purchasePrice', formData.purchasePrice);
    agreementData.append('deposit', formData.deposit);
    agreementData.append('offerExpiration', offerExpiration);
    agreementData.append('closingDate', closingDate);
    agreementData.append('landSurveyRequested', formData.landSurveyRequested);
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <IoDocumentTextOutline /> Make an Offer
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Property Address</label>
            <input
              className='form-control'
              id='property-address'
              value={addrStr}
              readOnly='readonly'
            />
          </div>
          <div className='form-group'>
            <label>Legal Name</label>
            <input
              className='form-control'
              id='legal-name'
              name='buyerName'
              value={buyerName}
              placeholder='Enter your full legal name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Purchase Price</label>
            <input
              className='form-control'
              id='purchase-price'
              name='purchasePrice'
              value={purchasePrice}
              placeholder="Enter offering amount in CAD"
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Closing Date</label>
            <DatePicker 
              selected={closingDate}
              onChange={(date) => setClosingDate(date)}
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
              value={deposit}
              placeholder='Enter any amount in CAD'
              onChange={onChange}
            />
          </div>
          <div className='form-group noselect'>
            <label>
              Request Current Land Survey?
              <input
                type='checkbox'
                id='landSurveyRequestedCb'
                name='landSurveyRequested'
                checked={landSurveyRequested}
                onChange={onChange}
              />
            </label>
          </div>
          <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Sign Agreement
              </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default MakeOffer