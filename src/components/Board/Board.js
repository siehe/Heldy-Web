import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './TaskList/TaskList';

import { boardLists } from '../../constants/boardLists';

import styles from './Board.module.scss';

const getColumn = (id, list) => list.find(el => el.alias === id);

const Board = () => {
    const [boardColumns, setBoardColumns] = useState(boardLists);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const columnStart = getColumn(source.droppableId, boardColumns);
        const coloumnFinish = getColumn(destination.droppableId, boardColumns);
        
        const newItemsIds = [...columnStart.tasksList];
        console.log(newItemsIds);
        newItemsIds.splice(source.index, 1)

        newItemsIds.splice(destination.index, 0, {name: draggableId})

        const newColumnStart = {
            ...columnStart,
            tasksList: newItemsIds
        }

        setBoardColumns(newColumnStart);
    }

    return <div className={styles.boardWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
            {boardColumns.map(({ name, alias, tasksList }) =>(<TaskList tasks={tasksList} name={name} alias={alias}></TaskList>))}
        </DragDropContext>
    </div>
}

export default Board;
