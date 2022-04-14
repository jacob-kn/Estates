import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CommentsCard from '../components/Comments'
import { FaPaperPlane } from "react-icons/fa";

function User () {
  let { id } = useParams()

  const auth = useSelector(state => state.auth)
  const user = auth.user
  
  let module = require('./tmpSeller.js')
  let tmpSeller = module.tmpSeller

  const seller = tmpSeller.filter(tmpSeller => tmpSeller._id == id)[0]

  const [comment, setComment] = useState('')

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

  const onComment = e => {
    setComment(e.target.value)
  }

  const onSubmit = e => {}

  return (
  <div className='content'>
    <h1>{seller.email}</h1>
    <h2>{headline}</h2>
    {user && user.type === 'buyer' ? (
      <>
        <br/>
        <div style={{width:"12rem", margin:"auto"}}>
          <button type='submit' className='btn btn-block' onClick={composeEmail}>
          <FaPaperPlane /> Send an Email
          </button>        
        </div>
      </>
    ) : (<></>)}
    {seller.isRealtor ? (
      <>
        <br/>
        <label htmlFor='Comment'>
          <CommentsCard comment={seller.Comments} />
        </label>
        {user && user.type === 'buyer' ? (
          <>
            <br/>
            <section className='form'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Leave a Comment</label>
                  <textarea
                    className='form-control'
                    id='legal-name'
                    value={comment}
                    placeholder='Write your own review here...'
                    onChange={onComment}
                  />
                </div>
                <button 
                  type='submit' 
                  className='btn btn-block' 
                  onClick={composeEmail}
                >
                  Add Comment
                </button>
              </form>
            </section>
          </>
        ) : (<></>)}
      </>
    ) : (<></>)}
  </div>
  )
}

export default User