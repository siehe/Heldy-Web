import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [ name, setName ] = useState('');
    const [ surname, setSurname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ secondName, setSecondName ] = useState();

    useEffect(() => {
        fetch('https://heldy-api-pupi.azurewebsites.net/persons/' + localStorage.getItem('userId'), {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token'),
            },
          },).then(res => res.json()).then(data => 
            {
                setName(data);
                setName(data.name);
                setSecondName(data.secondName);
                setEmail(data.email);
                setSurname(data.surname);
            }).catch(e => console.log(e.message));
    }, []);

    const submitEdir = e => {
        e.preventDefault();

        fetch()
    }

    return userInfo ? <div className={styles.wrapper}>
        <h2>Profile page</h2>
        <form>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Name</span><br></br>
                    <input type="text" name="name" value={name || ''} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <span>Surname</span><br></br>
                    <input type="text" name="surname" value={surname || ''} onChange={e => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Second name</span><br></br>
                    <input type="text" name="secondName" value={secondName || ''} onChange={e => setSecondName(e.target.value)}/>
                </div>
                <div>
                    <span>Department</span><br></br>
                    <input type="text" name="department"  disabled/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>E-mail</span><br></br>
                    <input type="text" name="email" value={email || ''} disabled/>
                </div>
                <div>
                    <span>Phone number</span><br></br>
                    <input type="text" name="phoneNumber" disabled/>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Skype</span><br></br>
                    <input type="text" name="skype" disabled/>
                </div>
                <div>
                    <span>Telegram</span><br></br>
                    <input type="text" name="text" disabled/>
                </div>
            </div>
            <input type="submit" value="Підтвердити зміни" />
        </form>
    </div> : null;
}

export default ProfilePage;