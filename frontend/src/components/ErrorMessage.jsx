import React from 'react'

const ErrorMessage = ({message}) => {

  return (
    <div>
        <p className='has-text-weight-bold has-text-danger'>
            {message}
        </p>
    </div>
  )
}

export default ErrorMessage