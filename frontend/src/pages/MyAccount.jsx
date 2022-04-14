import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import CommentsCard from '../components/Comments'
import Divider from '@mui/material/Divider'
import {
  updateCompany,
  updateEmail,
  updatePassword
} from '../features/auth/authSlice'

function MyAccount () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    company: ''
  })

  const { email, password, password2, company } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      dispatch(reset())
      navigate('/')
    }

    if (isSuccess) {
      toast.success('Successfully updated')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = e => {
    console.log(e.target.value)
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const changeEmail = e => {
    e.preventDefault()

    dispatch(updateEmail(email))

    setFormData({ email: '' })
  }

  const changePass = e => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      dispatch(updatePassword(password))
      setFormData({ password: '', password2: '' })
    }
  }

  const changeCompany = e => {
    e.preventDefault()

    dispatch(updateCompany(company))

    setFormData({ company: '' })
  }

  let module = require('./tmpRealtor.js')
  let tmpRealtor = module.tmpRealtor

  if (isLoading) {
    return <Spinner />
  }

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
              <FaUser /> My Account - Seller
            </h1>
          </>
        ) : null}
        {user && user.type === 'buyer' ? (
          <>
            <h1>
              <FaUser /> My Account - Buyer
            </h1>
          </>
        ) : null}
      </section>
      <section className='form'>
        <Divider sx={{ mb: 1.5 }} textAlign='left'>
          Edit Email
        </Divider>
        <form onSubmit={changeEmail}>
          <div className='form-group'>
            <label for='email'>
              Current email: <strong>{user.email}</strong>
            </label>
            <input
              className='textGradient'
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='New email'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' name='nameButton' className='btn btn-block'>
              Change email
            </button>
          </div>
        </form>

        <Divider sx={{ mb: 1.5 }} textAlign='right'>
          Edit Password
        </Divider>

        <form onSubmit={changePass}>
          <div className='form-group'>
            <input
              className='textGradient'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='New password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              className='textGradient'
              type='password'
              id='password'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button
              type='submit'
              name='passwordButton'
              className='btn btn-block'
            >
              Change password
            </button>
          </div>
        </form>

        {user.type === 'seller' && user.isRealtor ? (
          <>
            <Divider sx={{ mb: 1.5 }}>Edit Company</Divider>

            <form onSubmit={changeCompany}>
              <div className='form-group'>
                <label for='company'>
                  Current company: <strong>{user.company}</strong>
                </label>
                <input
                  className='textGradient'
                  type='text'
                  id='company'
                  name='company'
                  value={company}
                  placeholder='New company'
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <button
                  type='submit'
                  name='nameButton'
                  className='btn btn-block'
                >
                  Change company
                </button>
              </div>
            </form>
          </>
        ) : null}
      </section>

      <section className='Comments'>
        {user && user.type === 'seller' && user.isRealtor ? (
          <>
            <br></br>
            <label htmlFor='Comment'>
              <CommentsCard comments={user.comments} />
            </label>
          </>
        ) : null}
      </section>
    </>
  )
}

export default MyAccount
