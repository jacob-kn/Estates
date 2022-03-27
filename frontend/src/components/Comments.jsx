function CommentsCard (Coms) {
    
  const { comment } = Coms
return (
    <>
    <h3>
    Comments
    </h3>
    <label htmlFor ='Comment'>
        
        {comment.map(realtor => <p>{realtor}</p> )}
    
    </label>
    </>

)
}


export default CommentsCard