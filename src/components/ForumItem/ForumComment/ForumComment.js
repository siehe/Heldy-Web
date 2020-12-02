import React from 'react';

import styles from './ForumComment.module.scss';

const ForumComment = ({text}) => {
    return <div className={styles.wrapper}>
        {text}
    </div>
};

export default ForumComment;
