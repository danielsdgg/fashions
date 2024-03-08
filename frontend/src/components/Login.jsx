import React, { useContext, useState } from 'react'
import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContext'

const Login = (props) => {
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
    <div className='auth-form-container'>
        <h1 className="text-center font-bold text-2xl">LOGIN</h1>
        <form className='login-form' onSubmit={handleSubmit}>
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
            <label htmlFor="label">Password</label>
                <input
                 type="password"
                 placeholder='Enter Password'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className='input'
                 required
                />
        <ErrorMessage message={errorMessage}/>
        <br/>
        <button className="button is-primary" type='submit'>
            Login
        </button>
    </form>
    <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
</div>
  )
}

export default Login