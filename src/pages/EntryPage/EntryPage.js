import React from 'react';
import { Link } from 'react-router-dom';

import styles from './EntryPage.module.scss';
import logo from '../../icons/logo.png'

const EntryPage = () => {
    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <img src={logo} />
            <h2>Welcome to the Heldy!</h2>
            <p>The system of distance learning "Heldy" makes distance learning as easy as possible. The perfect tool for both - students and teachers - allows you to control students' progress as well as to monitor your own</p>
            <Link to="/login">
                <button className={styles.login}>Log in</button>
            </Link>
            <div className={styles.signupWrapper}>
                <span>Don't have an account?</span>
                <Link to="/registration">
                    <button className={styles.signup}>Sign up</button>
                </Link>
            </div>
        </div>
    </div>
}

export default EntryPage;