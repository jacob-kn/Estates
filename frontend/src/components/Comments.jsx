import { Paper, Grid, Avatar } from '@mui/material'

var stringToColour = function (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

function CommentsCard (props) {
  const { comments } = props

  return (
    <>
      <section style={{ width: '90%', margin: '0 auto' }}>
        <h2>Comments</h2>

        {comments && comments.length ? (
          comments.map(comment => (
            <Paper
              style={{ padding: '30px 20px', marginTop: 10 }}
              elevation={6}
            >
              <Grid container wrap='nowrap' spacing={2}>
                <Grid item>
                  <Avatar
                    sx={{
                      bgcolor: stringToColour(comment.user.email),
                      '&:hover': { opacity: 0.7 }
                    }}
                  >
                    {comment.user.email.charAt(0)}
                  </Avatar>
                </Grid>
                <Grid justifyContent='left' item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: 'left' }}>
                    {comment.user.email}
                  </h4>
                  <p style={{ textAlign: 'left' }}>{comment.comment}</p>
                </Grid>
              </Grid>
            </Paper>
          ))
        ) : (
          <p>No comments</p>
        )}
      </section>
    </>
  )
}

export default CommentsCard
