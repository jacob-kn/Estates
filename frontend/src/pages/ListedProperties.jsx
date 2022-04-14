import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropertyCard from '../components/PropertyCard.jsx'
import Spinner from '../components/Spinner'
import { getListings, reset } from '../features/userProps/userPropsSlice'

function ListedProperties () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { userProps, isLoading, isError, message } = useSelector(
    state => state.userProps
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    } else if (user.type !== 'seller') navigate('/')

    dispatch(getListings())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, user, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Listings</h1>
      </section>

      {userProps && !userProps.length == 0 ? (
        <section className='content'>
          <div className='properties'>
            {userProps.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </section>
      ) : (
        <section className='body'>
          <h3>List a property to see it here!</h3>
        </section>
      )}
    </div>
  )
}

export default ListedProperties
