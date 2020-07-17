import React, { useEffect } from 'react';
import { usePost } from '../usefull/rest';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV4YjV6KuW8BFnGnHcYZduaE48r9c_LD0';

const Login = () => {
    const [postData, signin] = usePost(url)
    useEffect(() => {
        if (Object.keys(postData.data).length > 0) {
            localStorage.setItem('token', postData.data.idToken);
        }
    }, [postData])
    const login = async() => {
        await signin({
            email: "paulo.debian.js@gmail.com",
            password: "abc1231",
            returnSecureToken: true 
        })
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