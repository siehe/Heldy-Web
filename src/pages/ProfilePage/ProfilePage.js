import React from 'react';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
    return <div className={styles.wrapper}>
        <h2>Profile page</h2>
        <form>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Name</span><br></br>
                    <input type="text" name="name" />
                </div>
                <div>
                    <span>Surname</span><br></br>
                    <input type="text" name="surname" />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Position</span><br></br>
                    <input type="text" name="position" />
                </div>
                <div>
                    <span>Department</span><br></br>
                    <input type="text" name="department" />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>E-mail</span><br></br>
                    <input type="text" name="email" />
                </div>
                <div>
                    <span>Phone number</span><br></br>
                    <input type="text" name="phoneNumber" />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <span>Skype</span><br></br>
                    <input type="text" name="skype" />
                </div>
                <div>
                    <span>Telegram</span><br></br>
                    <input type="text" name="text" />
                </div>
            </div>
            <input type="submit" value="Підтвердити зміни" />
        </form>
    </div>
}

export default ProfilePage;