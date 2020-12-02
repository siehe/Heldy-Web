import React, { useState } from 'react';
import ForumComment from './ForumComment/ForumComment';

const ForumItem = ({id, getComments, question = "No question", answear = "No answear", deadline = new Date(), type, subject, comments = [] }) => {
    const [ commentText, setCommentText ] = useState('');

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
            if(res.ok) {
                getComments();
            }
        });
    };

    return <div>
        <div>Theme: {question}
        </div>
        <div>
            Question: {answear}
            <div>
                <span>Asked at: {deadline.toDateString()}</span>
                <span>{type}</span>
                <span>{subject}</span>
            </div>
        </div>
        <div>
            {comments.map(({text, id}) => <ForumComment key={id} text={text}/> )}
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <textarea type="text" placeholder="Leave your comment" value={commentText} onChange={e => setCommentText(e.target.value)}/>
                <input type="submit" value="Comment"/>
            </form>
        </div>
    </div>
};

export default ForumItem;
