import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr' // icons
import CommentsCard from '../components/Comments'

function MyAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPass: '',
    company: ''
  })

  const { email, 
          password, 
          confirmPass,
          company
        } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = e => {
    console.log(e.target.value)
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
      
    }))
  }

  const onSubmit = e => {
    var select = document.getElementById("Quadrant");
    console.log(select.value);
    const Quadrant = select.value;
    e.preventDefault()

    const postData = {
      email, 
      password, 
      confirmPass
      }
      console.log(postData)
    
  }




  const { user } = useSelector(state => state.auth) // get user
  let module = require('./tmpRealtor.js')
  let tmpRealtor = module.tmpRealtor

/**
  const temp = "HOW DO I PRINT THIS"
  console.log(user)
  if(user && user.type === 'seller'){
    console.log(user.isRealtor)
  }
 */

  return (
    <>
    <section className='heading'>
    {user && user.type === 'seller' && user.isRealtor ? (
          <>
      <h1>
              <FaUser /> My Account - Realtor
      </h1>
          </>
        ) : null}
        {user && user.type === 'seller' && !user.isRealtor ? (
            <>
      <h1>
              <FaUser /> My Account- Seller
      </h1>
            </>
          ) : null}
          {user && user.type === 'buyer' ? (
              <>
      <h1>
              <FaUser /> My Account- Buyer
      </h1>
              </>
            ) : null}
    </section>
    <section className='User info'>
    <form onSubmit={onSubmit}>
    <h2>
      Change email</h2>
       <label>{tmpRealtor.map(realtor => <>{user.email}</>)}</label>
      <span className='change'>
      <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter new email here'
              onChange={onChange}
            />
      </span>
      <h2>
      Change Password<br></br>
      <span className='change'>
      <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your new password'
              onChange={onChange}
            />
      <input
              type='confirmPass'
              id='confirmPass'
              name='confirmPass'
              value={confirmPass}
              placeholder='confirm your new password'
              onChange={onChange}
            />
      </span>
      </h2>
      <section>
    {user && user.type === 'seller' && user.isRealtor ? (
          <>
    <h2>
      Change company </h2>
      <label> {tmpRealtor.map(realtor => <>{realtor.company}</>)} </label>
      <span className='change'>
      <input
              type='company'
              id='company'
              name='company'
              value={company}
              placeholder='Enter new company'
              onChange={onChange}
            />
      </span>
          </>
        ) : null}
      
    </section>
      </form>
    </section>
    <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
      
    <section className = 'Comments'>
    {user && user.type === 'seller' && user.isRealtor ? (
          <>
          <br></br>
      <label htmlFor ='Comment'>
            {tmpRealtor.map(realtor => (
            <CommentsCard
            comment = {realtor.Comments}
            />
          ) )}
      </label>
          </>
        ) : null}
      
    </section>
    </>
  )
}

export default MyAccount
