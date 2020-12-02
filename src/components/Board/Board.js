import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList/TaskList';

import { modifyBoardLists } from '../../utils/boardUtil';

import styles from './Board.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';
import { showWarning } from '../../store/actions/warning';
import { setBoardColumns } from '../../store/actions/boardColumns';

const getColumn = (id, lists) => lists.find(el => el.id === +id);

const Board = () => {
    const dispatch = useDispatch();
    const userTasksList = useSelector((store) => store.userTasksList);
    const userColumns = useSelector((store) => store.userColumns);
    const isWarningShown = useSelector((store) => store.isWarningShown);
    const boardColumns = useSelector((store) => store.boardColumns);

    useEffect(() => {
        dispatch(loadUserCategories());
        dispatch(loadUserList(localStorage.getItem('userId')));
    }, [])

    useEffect(() => {
        if(userTasksList.length && userColumns.length) {
            dispatch(setBoardColumns(modifyBoardLists(userTasksList, userColumns)));
        }
    }, [userTasksList, userColumns])

    useEffect(() => {
        if(boardColumns.length && boardColumns[0].lists.length >= 10) {
            dispatch(showWarning({ show: !isWarningShown, text: 'text', header: 'Warning!' }));
        }
    }, [boardColumns])

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const columnStart = getColumn(source.droppableId, boardColumns);
        const columnFinish = getColumn(destination.droppableId, boardColumns);
        const columns = [...boardColumns];

        if (columnStart.id === columnFinish.id) {
            const newItems = [...columnStart.lists];

            const deletedItem = newItems.splice(source.index, 1)

            newItems.splice(destination.index, 0, deletedItem);
        } else {
            const newStartItems = [...columnStart.lists];

            const deletedItem = newStartItems.splice(source.index, 1)[0];

            const newColumnStart = {
                ...columnStart,
                lists: newStartItems
            };

            const newFinishItems = [...columnFinish.lists];

            newFinishItems.splice(destination.index, 0, deletedItem);

            const newColumnFinish = {
                ...columnFinish,
                lists: newFinishItems
            }

            columns.splice(newColumnStart.id - 1, 1, newColumnStart);
            
            columns.splice(newColumnFinish.id - 1, 1, newColumnFinish);
            dispatch(setBoardColumns(columns));
        }
    }

    return <div className={styles.boardWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
            {boardColumns.map(({ name, id, lists }) => (<TaskList tasks={lists} name={name} id={id} key={id}></TaskList>))}
        </DragDropContext>
    </div>
}

export default Board;
