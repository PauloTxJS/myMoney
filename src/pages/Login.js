import React, { useEffect, useState } from 'react';
import { usePost } from '../usefull/rest';
import { Redirect } from 'react-router-dom';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV4YjV6KuW8BFnGnHcYZduaE48r9c_LD0';

const Login = () => {
    const [postData, signin] = usePost(url)
    const [logged, setLogged] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            email,
            password,
            returnSecureToken: true 
        })
    }

    const onChangeEmail = evt => {
        setEmail(evt.target.value)
    }

    const onChangePassword = evt => {
        setPassword(evt.target.value)
    }

    if (logged) {
        return <Redirect to='/'/>
    }
    return (
        <div className="text-center">
            <h1>Login</h1>
            {
                postData.error && postData.error.length > 0 &&
                <p>E-mail e/ou senha inválidos</p>
            }
            <input type="text" value={email} onChange={onChangeEmail} placeholder="Digite seu e-mail"/>
            <input type="password" value={password} onChange={onChangePassword} placeholder="Digite sua senha"/>
            <button onClick={login}>Login</button>
        </div>
        
    )
}

export default Login;