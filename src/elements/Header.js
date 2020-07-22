import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const Header = () => {
    const [logged, setLogged] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLogged(true)
        } else {
            setLogged(false)
        }
    })
    const logout = () => {
        localStorage.removeItem('token')
        setLogged(false)
        window.location.reload()
    }
    
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>MyMoney</Link>
                { logged &&
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <button type="button" onClick={logout} className="btn nav-link">Sair</button>
                        </li>
                    </ul>
                }
            </div>  
        </nav>
    )
}

export default Header