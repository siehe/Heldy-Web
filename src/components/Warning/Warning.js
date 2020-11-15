import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWarning } from '../../store/actions/warning';

import styles from './Warning.module.scss';

const Warning = () => {
    const dispatch = useDispatch();
    const isWarningShown = useSelector((store) => store.isWarningShown);

    const handleClick = e => {
        e.preventDefault();
        dispatch(showWarning(!isWarningShown));
    };

    return isWarningShown ? <div className={styles.wrapper}>
        <button onClick={handleClick}>
            X
        </button>
        <span className={styles.headline}>Warning!</span>
        <div>
            We must inform that you have too many undone tasks on your list.
            <span>Please, try to hurry up!</span>
        </div>
    </div> : null;
};

export default Warning;
