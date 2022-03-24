//rfce is shorthand to set up basic elements
import React from 'react' // don't need this done automatically

import { FaSignInAlt, FaSignOutAlt, FaUser, FaHouseUser } from 'react-icons/fa' // icons
import { BsPersonPlusFill, BsCardList } from 'react-icons/bs' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom' // routing

function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth) // get user

  const onLogout = () => {
    // logout function
    dispatch(logout()) // needed case in reducer
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={process.env.PUBLIC_URL + '/estates.png'} width='25' />
          Estates
        </Link>
      </div>

      <ul>
        {user && user.type === 'buyer' ? (
          <>
            <li>
              <Link to='/saved-properties'>
                <FaHouseUser /> Saved properties
              </Link>
            </li>
          </>
        ) : null}

        {user && user.type === 'seller' ? (
          <>
            <li>
              <Link to='/listed-properties'>
                <FaHouseUser /> Listed properties
              </Link>
            </li>
          </>
        ) : null}

        {user ? (
          <>
            <li>
              <Link to='/my-account'>
                <FaUser /> My Account
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register/buyer'>
                <BsPersonPlusFill /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  ) // end return
}

export default Header

/**
 
<header className='header'>
      <div className='logo'>
        <Link to='/'>Aviar</Link>
      </div>
      <ul>
        {user ? (  // like if statements   user already signed in
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : ( // else
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>


 */
