import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginBuyer, loginSeller, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

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
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onBuyerLogin = e => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(loginBuyer(userData))
  }

  const onSellerLogin = e => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(loginSeller(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onBuyerLogin}>
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

          <h3>Login as:</h3>

          <div className='btnOption'>
            <div className='form-group'>
              <button type='submit' className='btn'>
                Buyer
              </button>
            </div>
            <div className='form-group'>
              <button onClick={onSellerLogin} className='btn'>
                Seller
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
