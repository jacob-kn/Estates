import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CommentsCard from '../components/Comments'
import { FaPaperPlane } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { getSeller, reset } from '../features/sellerInfo/sellerInfoSlice'
import { addComment } from '../features/auth/authSlice'
import { getListSubheaderUtilityClass } from '@mui/material'

function User () {
  let { id } = useParams()

  const { user } = useSelector(state => state.auth)

  const { seller, isLoading, isError, message } = useSelector(
    state => state.sellerInfo
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getSeller(id))

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, id, navigate, dispatch])

  const [comment, setComment] = useState('')

  const headline = () => {
    let headline = 'Seller'
    if (seller.isRealtor) {
      headline = 'Realtor'
      if (seller.company != null) {
        headline += ' at ' + seller.company
      }
    }
    return headline
  }

  const composeEmail = () => {
    let subject = 'Interest in your property (via Estates)'
    let body =
      'Hello!%0D%0A%0D%0AI saw your property on Estates and would love to learn more.%0D%0A%0D%0ARegards,%0D%0A<Your Name Here>'
    let mailto = `mailto:${seller.email}?subject=${subject}&body=${body}`
    window.location.href = mailto
  }

  const onComment = e => {
    setComment(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    const data = { comment, rid: id }

    dispatch(addComment(data))
    setComment('')

    toast.success('Comment added')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {!seller ? (
        <p>Seller does not exist</p>
      ) : (
        <div className='content'>
          <h1>{seller.email}</h1>
          <h2>{headline()}</h2>
          {user && user.type === 'buyer' ? (
            <>
              <br />
              <div style={{ width: '12rem', margin: 'auto' }}>
                <button
                  type='submit'
                  className='btn btn-block'
                  onClick={composeEmail}
                >
                  <FaPaperPlane /> Send an Email
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
          {seller.isRealtor ? (
            <>
              <br />
              <label htmlFor='Comment'>
                <CommentsCard comments={seller.comments} />
              </label>
              {user && user.type === 'buyer' ? (
                <>
                  <br />
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
                      <button type='submit' className='btn btn-block'>
                        Add Comment
                      </button>
                    </form>
                  </section>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  )
}

export default User
