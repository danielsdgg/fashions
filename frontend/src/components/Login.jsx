import React, { useContext, useState } from 'react'
import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [, setToken] = useContext(UserContext)

    const submitLogin = async () => {
        const requestOptions = {
            method:"POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`)
        };
        const response = await fetch("/api/token/user", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setErrorMessage(data.detail);
        }
        else {
            setToken(data.access_token);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitLogin();
    }


  return (
    <div className='column'>
    <form className='box' onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Login</h1>
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
        <ErrorMessage message={errorMessage}/>
        <br/>
        <button className="button is-primary" type='submit'>
            Login
        </button>
        <Link to={'/register'}><p className='mt-4 font-semibold'>Don't have an account? Sign up here</p></Link>
    </form>
</div>
  )
}

export default Login