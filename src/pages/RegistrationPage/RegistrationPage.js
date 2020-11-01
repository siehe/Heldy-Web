import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import RegistrationForm from '../../components/Registration/RegistrationForm';

import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
    const [isRedirect, setIsRedirect] = useState(false);

    return isRedirect ? <Redirect to={{
        pathname: '/board'
    }}/> : <div className={styles.container}>
        <RegistrationForm />
        <button onClick={() => setIsRedirect(!isRedirect)}>back to the board</button> 
    </div>;
}

export default RegistrationPage;
