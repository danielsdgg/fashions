import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorMessage from './ErrorMessage'
import { Link } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [, setToken] = useContext(UserContext)

    const submitRegistration = async () => {
        const requestOptions = {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email, hashed_password:password})
        }
        const response = await fetch("/api/users", requestOptions)
        const data = await response.json()

        if (!response.ok){
            setErrorMessage(data.detail);
        }
        else{
            setToken(data.access_token)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmationPassword && password.length > 7){
            submitRegistration()
        }
        else{
            setErrorMessage("Ensure that the passwords match and is greater than 7 characters")
        }
    }
    

  return (
    <div className='column'>
        <form className='box' onSubmit={handleSubmit}>
            <h1 className="title has-text-centered">Register</h1>
            {/* Email field */}
            <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                    <input
                     type="email"
                     placeholder='Enter Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className='input'
                     required
                    />
                </div>
            </div>
            {/* Password field */}
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input
                     type="password"
                     placeholder='Enter Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className='input'
                     required
                    />
                </div>
            </div>
            {/* confirmation password field */}
            <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                    <input
                     type="password"
                     placeholder='Enter password'
                     value={confirmationPassword}
                     onChange={(e) => setConfirmationPassword(e.target.value)}
                     className='input'
                     required
                    />
                </div>
            </div>
            <ErrorMessage message={errorMessage}/>
            <br/>
            <button className="button is-primary" type='submit'>
                Register
            </button>
            <Link to={'/'}><p className='mt-4 font-semibold'>Already have an account? Login</p></Link>

        </form>
    </div>
  )
}

export default Register