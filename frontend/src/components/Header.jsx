import React, { useState } from 'react'

import { FaSignInAlt, FaSignOutAlt, FaUser, FaHouseUser } from 'react-icons/fa' // icons
import { BsPersonPlusFill, BsCardList } from 'react-icons/bs' // icons
import { GrAdd } from 'react-icons/gr' // icons

import { useSelector, useDispatch } from 'react-redux' // for logout
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom' // routing

import {
  useMediaQuery,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  ThemeProvider,
  Menu,
  MenuItem
} from '@mui/material'
import { FaBars, FaUserCircle } from 'react-icons/fa'

function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth) // get user

  const theme = createTheme({
    palette: {
      primary: { main: '#FFF' }
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
      button: {
        textTransform: 'none'
      }
    }
  })
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const [anchorNav, setAnchorNav] = useState(null)

  const handleOpenMenu = e => {
    setAnchorNav(e.currentTarget)
  }

  const handleCloseMenu = e => {
    setAnchorNav(null)
  }

  const onLogout = () => {
    // logout function
    dispatch(logout()) // needed case in reducer
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      {isDesktop ? (
        <>
          {anchorNav && handleCloseMenu()}
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
                    <Link to='/add-property'>
                      <GrAdd /> Add Property
                    </Link>
                  </li>
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
        </>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <AppBar
              position='static'
              color='primary'
              sx={{ boxShadow: '1', marginBottom: '20px' }}
            >
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link to='/'>
                  <img
                    src={process.env.PUBLIC_URL + '/estates.png'}
                    width='25'
                  />
                  Estates
                </Link>

                <IconButton
                  size='large'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleOpenMenu}
                  sx={{ mr: 2 }}
                >
                  <FaBars />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorNav}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  open={Boolean(anchorNav)}
                  onClose={handleCloseMenu}
                >
                  {!user ? (
                    <>
                      <MenuItem onClick={handleCloseMenu}>
                        <Link to='/login'>
                          <FaSignInAlt /> Login
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
                        <Link to='/register/buyer'>
                          <BsPersonPlusFill /> Register
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      {user.type === 'seller' ? (
                        <>
                          <MenuItem onClick={handleCloseMenu}>
                            <Link to='/add-property'>
                              <GrAdd /> Add Property
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseMenu}>
                            <Link to='/listed-properties'>
                              <FaHouseUser /> Listed properties
                            </Link>
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem onClick={handleCloseMenu}>
                            <Link to='/saved-properties'>
                              <FaHouseUser /> Saved properties
                            </Link>
                          </MenuItem>
                        </>
                      )}
                      <MenuItem onClick={handleCloseMenu}>
                        <Link to='/my-account'>
                          <FaUser /> My Account
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleCloseMenu}>
                        <div onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                        </div>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </>
      )}
    </>
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
