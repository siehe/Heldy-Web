import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../store/actions/logOut';
import styles from './LoginForm.module.scss';

import logo from '../../icons/logo.png';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    useEffect(() => {
        localStorage.removeItem("token");
        dispatch(logOut());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://localhost:44369/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json()).then(data => {
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                dispatch(logOut(true));
                setIsRedirect(true);
            }
        }).catch(e => {
            dispatch(logOut(false));
        })
    }

    return isRedirect ? <Redirect to={{ pathname: '/board' }} /> : <div className={styles.container}>
        <div className={styles.wrapper}>
            <img src={logo} />
            <h3 >Log in</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" required placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Log in" />
            </form>
        </div>
    </div>;
};

export default LoginForm;
