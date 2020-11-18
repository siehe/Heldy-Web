import React, { useState } from 'react';

const StudentRegistration = () => {
    const [email, setEmail] = useState('');

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
        })
    };
    console.log('i am rendered');
    return <div>
        <h4>Student registration</h4>
        <form onSubmit={handleSubmit}>
            <input type="text" required placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)} />
            <input type="submit"/>
        </form>
    </div>
};

export default StudentRegistration;

