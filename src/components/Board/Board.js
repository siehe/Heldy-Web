import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList/TaskList';

import { modifyBoardLists } from '../../utils/boardUtil';

import styles from './Board.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';

const getColumn = (id, lists) => lists.find(el => el.id === +id);

const Board = () => {
    const dispatch = useDispatch();
    const userTasksList = useSelector((store) => store.userTasksList);
    const userColumns = useSelector((store) => store.userColumns);

    const [boardColumns, setBoardColumns] = useState([]);

    useEffect(() => {
        dispatch(loadUserCategories());
        dispatch(loadUserList(2));
    }, [])

    useEffect(() => {
        if(userTasksList.length && userColumns.length) {
            setBoardColumns(modifyBoardLists(userTasksList, userColumns));
        }
    }, [userTasksList, userColumns])

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

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
            console.log(columns);
            setBoardColumns(columns);
        }
    }

    return <div className={styles.boardWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
            {boardColumns.map(({ name, id, lists }) => (<TaskList tasks={lists} name={name} id={id} key={id}></TaskList>))}
        </DragDropContext>
    </div>
}

export default Board;
