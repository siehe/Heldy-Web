import React from 'react';
import RegistrationForm from '../../components/Registration/RegistrationForm';

import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
    return <div className={styles.container}>
        <RegistrationForm />
    </div>;
}

export default RegistrationPage;
