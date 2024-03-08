import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorMessage from './ErrorMessage'

const Register = (props) => {
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
    <div className='auth-form-container'>
        <h1 className="text-center font-bold text-2xl">Register</h1>
        <form className='register-form' onSubmit={handleSubmit}>
            {/* Email field */}
                <label htmlFor="label">Email Address</label>
                    <input
                     type="email"
                     placeholder='Enter Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className='input'
                     required
                    />
            {/* Password field */}
                <label htmlFor="password">Password</label>
                    <input
                     type="password"
                     placeholder='Enter Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className='input'
                     required
                    />
            {/* confirmation password field */}
                <label htmlFor="confirmationPassword">Confirm Password</label>
                    <input
                     type="password"
                     placeholder='Confirm password'
                     value={confirmationPassword}
                     onChange={(e) => setConfirmationPassword(e.target.value)}
                     className='input'
                     required
                    />
            <ErrorMessage message={errorMessage}/>
            <br/>
            <button className="button is-primary" type='submit'>
                Register
            </button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  )
}

export default Register