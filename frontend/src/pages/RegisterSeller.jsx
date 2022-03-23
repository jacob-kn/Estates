import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { registerSeller, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function RegisterSeller () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    isRealtor: false,
    company: ''
  })

  const { email, password, password2, isRealtor, company } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        email,
        password,
        isRealtor,
        company
      }

      dispatch(registerSeller(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create a seller account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group noselect'>
            <label>
              Are you a realtor?
              <input
                type='checkbox'
                id='realtorCb'
                name='isRealtor'
                checked={isRealtor}
                onChange={onChange}
              />
            </label>
          </div>

          {/* Hide realtor form when checkbox is not selected */}
          {isRealtor ? (
            <>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='company'
                  name='company'
                  value={company}
                  placeholder='Enter your company name'
                  onChange={onChange}
                />
              </div>
            </>
          ) : null}

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>

      <div>
        <Link to='/register/buyer'>
          <h3 className='greyHover'>Register as a Buyer?</h3>
        </Link>
      </div>
    </>
  )
}

export default RegisterSeller
