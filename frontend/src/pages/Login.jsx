import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login () {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

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

  const onSubmit = e => {
    e.preventDefault()

    const userData = {
      username,
      password
    }

    dispatch(login(userData))
  }

  const sellerLogin = e => {
    e.preventDefault()

    const userData = {
      username,
      password
    }
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
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='username'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Enter your username'
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
              <button onClick={sellerLogin} className='btn'>
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
