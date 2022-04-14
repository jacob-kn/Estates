import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropertyCard from '../components/PropertyCard.jsx'
import Spinner from '../components/Spinner'
import { getSavedProperties, reset } from '../features/userProps/userPropsSlice'

function SavedProperties () {
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
    } else if (user.type !== 'buyer') navigate('/')

    dispatch(getSavedProperties())

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
        <h1>Saved Properties</h1>
      </section>

      {userProps && !userProps.length == 0 ? (
        <section className='content'>
          <div className='properties'>
            {userProps.map(property => (
              <PropertyCard
                key={property._id}
                property={property}
                browse={true}
                saved={true}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className='body'>
          <h3>Save a property to see it here!</h3>
        </section>
      )}
    </div>
  )
}

export default SavedProperties
