import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
    return <div className={styles.container}>
        <LoginForm></LoginForm>
    </div>
};

export default LoginPage;
