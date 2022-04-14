import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { IoDocumentTextOutline } from 'react-icons/io5'
import DatePicker from 'react-datepicker'
import Spinner from '../components/Spinner'
import "react-datepicker/dist/react-datepicker.css";
import { addAgreement, reset } from '../features/agreements/agreementsSlice'

function MakeOffer () {
  let { id } = useParams()
  
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

  const { user } = useSelector( // get user information
    state => state.auth
  )
  const { agreement, isLoading, isError, isSuccess, message } = useSelector(
    state => state.addAgreement
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {

    if (isError) { // error in handling things if not all fields are filled
      toast.error(message)
    }

    if (!user) { // shouldn't need this part but good to have
      navigate('/login')
    }

    if (isSuccess) {
      toast('Offer Sent')
      //navigate('/') // go to dashboard
    }

    return () => {
      dispatch(reset()) // reset the variables
    }
  }, [
    user, 
    isLoading, 
    isError, 
    isSuccess,
    message,
    dispatch,
    navigate,
  ])
  
  const onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const onSubmit = async e => {
    e.preventDefault();

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

    dispatch(addAgreement(agreementData))
  }

  if (isLoading) {
    return <Spinner />
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
        <br />
      </section>
    </>
  )
}

export default MakeOffer