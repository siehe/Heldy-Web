import React, { useState } from 'react';
import ForumComment from './ForumComment/ForumComment';

import styles from './ForumItem.module.scss';

const ForumItem = ({ id, getComments, question = "No question", answear = "No answear", deadline = new Date(), type, subject, comments = [] }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        fetch('https://heldy-api-pupi.azurewebsites.net/comments/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                authorId: Number(localStorage.getItem('userId')),
                replyTo: Number(id),
                text: commentText,
            }),
        })
        .then(res => {
            if (res.ok) {
                getComments();
            }
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.firstRow}>
                <span>Topic: {question}</span>
                <span>Asked at: {deadline.toDateString()}</span>
            </div>
            <div>
                <p className={styles.question}>Question: {answear}</p>
                <div>
                    <span>{type}</span>
                    <span>{subject}</span>
                </div>
            </div>
            <div className={styles.teacherPart}>
                <div className={styles.comments}>
                    <p>Teacher's answers</p>
                    {comments.map(({ text, id }) => <ForumComment key={id} text={text} />)}
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea type="text" placeholder="Leave your comment" value={commentText} onChange={e => setCommentText(e.target.value)} />
                    <div>
                        <input type="submit" value="Send the comment" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForumItem;
