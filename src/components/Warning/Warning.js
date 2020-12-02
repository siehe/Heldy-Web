import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWarning } from '../../store/actions/warning';

import styles from './Warning.module.scss';

const Warning = () => {
    const dispatch = useDispatch();
    const isWarningShown = useSelector((store) => store.isWarningShown);
    const text = useSelector(store => store.text);
    const header = useSelector(store => store.alertHeader);
    
    useEffect(() => {
        setTimeout(() => {
            dispatch(showWarning(!isWarningShown));
        }, 3000);
    }, [])

    const handleClick = e => {
        e.preventDefault();
        dispatch(showWarning(!isWarningShown));
    };

    return isWarningShown ? <div className={styles.wrapper}>
        <button onClick={handleClick}>
            X
        </button>
        <span className={styles.headline}>{header}</span>
        <div>
            {text}
        </div>
    </div> : null;
};

export default Warning;
