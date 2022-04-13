import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CommentsCard from '../components/Comments'

function User () {
  let { id } = useParams()

  const auth = useSelector(state => state.auth)
  const user = auth.user
  
  let module = require('./tmpSeller.js')
  let tmpSeller = module.tmpSeller

  const seller = tmpSeller.filter(tmpSeller => tmpSeller._id == id)[0]

  let headline = "Seller"
  if (seller.isRealtor) {
    headline = "Realtor"
    if (seller.company != null) {
      headline += " at " + seller.company
    }
  }

  const composeEmail = () => {
    let subject = "Interest in your property (via Estates)"
    let body = "Hello!%0D%0A%0D%0AI saw your property on Estates and would love to learn more.%0D%0A%0D%0ARegards,%0D%0A<Your Name Here>"
    let mailto = `mailto:${seller.email}?subject=${subject}&body=${body}`
    window.location.href=mailto
  }

  return (
  <div className='content'>
    <h1>{seller.email}</h1>
    <h2>{headline}</h2>
    {seller.isRealtor ? (
      <>
        <br/>
        <label htmlFor='Comment'>
          <CommentsCard comment={seller.Comments} />
        </label>
      </>
    ) : (<></>)}
    {user && user.type === 'buyer' ? (
      <>
        <br/>
        <button type='submit' className='btn btn-block' onClick={composeEmail}>
        Send an Email
        </button>
      </>
    ) : (<></>)}
  </div>
  )
}

export default User