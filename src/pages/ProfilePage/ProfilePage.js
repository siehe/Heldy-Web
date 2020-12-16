import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [secondName, setSecondName] = useState();
    const [image, setImage] = useState('');

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetch('https://heldy-api-pupi.azurewebsites.net/persons/' + localStorage.getItem('userId'), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
        }).then(res => res.json()).then(data => {
            setUserInfo(data);
            setName(data.name);
            setSecondName(data.secondName);
            setEmail(data.email);
            setSurname(data.surname);
            setImage(data.image);
        }).catch(e => console.log(e.message));
    }, []);

    const submitEdit = e => {
        e.preventDefault();

        fetch('https://heldy-api-pupi.azurewebsites.net/persons/' + userInfo.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                name,
                surname,
                secondName,
            }),
        })
    }

    const fileChangeHandler = async (e) => {
        const formData = new FormData();
        formData.append('personId', userId);

        const files = Array.from(e.target.files)
        files.forEach((file,i) => {
            formData.append(i,file);
        })
        await fetch('https://heldy-api-pupi.azurewebsites.net/account/updateProfileImage',{
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: formData
        })
    }

    return userInfo ? <div className={styles.wrapper}>
        <h2>Profile page</h2>
        <div className={styles.formWrapper}>
            <div className={styles.image}>
                <img src="https://lh3.googleusercontent.com/proxy/K7GKBAbfyFpA-BburUAuTPloINJDMACAOMGZZklbTScZDDuaRquEnohzQ3-RemwCxyzC5SQ6fgTGAZlQHgi0ooV9s6Zz4FMHV6p7sPY1rG-NOKt9n414HbVQzIhjtZojbptcAJMElTAqyPhXwafOF-R6TSKqpTVPp4SsTyKXTaX9ZYH5R23M7x0pU1uEzDEHoUUl_6oBI1rT-keiYc2yKHTnti0SOSsBUQ_W8Eq20na5gk7ncFGuLs7YG_AjH7YSUkc0s8oiNqQm8_ryk7lXd9o26GolIbqA9i-aV7sSMKFpQ7hITBIZSUFZT3yRciB0T42pe_YVMRu_AsULyaTz_tv2hPwEjWbk__FwSm6oLPEFabFxHmqcOgZ-nSnOIFxdg-ekS1KW8tSabIQ71nIj5jzpGvRxgnIyTKD5rlRsyHU78qGSy8bSXWDR4soAp9ZzNyyxN65GRltwX5I4e3ae7b_y6e66DExZhqBFADgTjiRSMb5FxKIeMIFgyIZXy1YayeycoJOSxUEeHf5-t2gsfBSXv9sgAK7XHxTN1RQcohcTYxuhXXDJbKIZhDhYd1yVvNNxo7E"/>
            </div>
            <form onSubmit={submitEdit}>
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <span>Name</span><br></br>
                        <input type="text" name="name" value={name || ''} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <span>Surname</span><br></br>
                        <input type="text" name="surname" value={surname || ''} onChange={e => setSurname(e.target.value)} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <span>Second name</span><br></br>
                        <input type="text" name="secondName" value={secondName || ''} onChange={e => setSecondName(e.target.value)} />
                    </div>
                    <div>
                        <span>Department</span><br></br>
                        <input type="text" name="department" disabled />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <span>E-mail</span><br></br>
                        <input type="text" name="email" value={email || ''} disabled />
                    </div>
                    <div>
                        <span>Phone number</span><br></br>
                        <input type="text" name="phoneNumber" disabled />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <span>Skype</span><br></br>
                        <input type="text" name="skype" disabled />
                    </div>
                    <div>
                        <span>Telegram</span><br></br>
                        <input type="text" name="text" disabled />
                    </div>
                </div>
                </form>
            </div>
            <form>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Skype</span><br></br>
                    <input type="text" name="skype" disabled />
                </div>
                <div>
                    <span>Telegram</span><br></br>
                    <input type="text" name="text" disabled />
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img src={'https://heldy-api-pupi.azurewebsites.net/file/' + image} width='200px' height='200px'/>
                <input type='file' id='file-input' onChange={(event => fileChangeHandler(event))}/>
            </div>
            <input type="submit" value="Submit" style={{ cursor: 'pointer' }} />
        </form>
    </div> : null;
}

export default ProfilePage;