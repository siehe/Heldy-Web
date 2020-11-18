import React, { useState } from 'react';

import styles from './StudentRegistration.module.scss';

const alertSuccess = (text) => {
    return <div className={styles.alert}>
        {text}
    </div>
}

const StudentRegistration = () => {
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [ isDisplayed, setIsDisplayed ] = useState(true);

    const setTime = () => {
        setTimeout(() => {
            setIsDisplayed(true);
        }, 3000);
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('https://heldy-api-pupi.azurewebsites.net/account/registerStudent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                email,
            })
        }).then(data => {
            if(data.ok) {
                setText('Registration is sucsseded');
            } else {
                setText('Something went wrong');
            }
        }).then(() => {
            setIsDisplayed(!isDisplayed);
            setTime();
        }).catch(e => {
            console.log(e.message);
        });
    };
    
    return isDisplayed ? <div className={styles.wrapper}>
        <h4>Student registration</h4>
        <form onSubmit={handleSubmit}>
            <input type="text" required placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} />
            <input type="submit" value="Submit" />
        </form>
    </div> : alertSuccess(text)
};

export default StudentRegistration;

