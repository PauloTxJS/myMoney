import React, { useEffect, useState } from 'react';
import { usePost } from '../usefull/rest';
import { Redirect } from 'react-router-dom';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV4YjV6KuW8BFnGnHcYZduaE48r9c_LD0';

const Login = () => {
    const [postData, signin] = usePost(url)
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        if (Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken);
            window.location.reload()
        }
    }, [postData])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLogged(true)
        }
    })
    const login = async() => {
        await signin({
            email: "paulo.debian.js@gmail.com",
            password: "abc123",
            returnSecureToken: true 
        })
    }
    if (logged) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            <h1>Login</h1>
            {JSON.stringify(postData)}
            <button onClick={login}>Login</button>
        </div>
        
    )
}

export default Login;