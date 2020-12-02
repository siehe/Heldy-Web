import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ForumItem from '../../components/ForumItem/ForumItem';
import { loadComment } from '../../store/actions/comments';
import { loadUserList } from '../../store/actions/userList';
import { filterProblems } from '../../store/selectors/filterQ&Atask';

const QAPage = () => {
    const dispatch = useDispatch();
    const userTasksList = useSelector((store) => filterProblems(store.userTasksList));
    const getComments = useCallback(() => {
        const tasksIds = userTasksList.map(({ id }) => id);
        dispatch(loadComment(tasksIds));
    }, [userTasksList, dispatch]);

    useEffect(() => {
        dispatch(loadUserList(localStorage.getItem('userId')));
    }, []);

    return <div>
        <h2>Q&A forum</h2>
        <div>
            {userTasksList.map(({statement, description, comments, id}) => <ForumItem key={id} id={id} getComments={getComments} comments={comments} question={statement} answear={description}/>)}
        </div>
    </div>
};

export default QAPage;
