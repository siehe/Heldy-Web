import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { mockedTasks } from '../../constants/tasks';
import TaskList from './TaskList/TaskList';
import styles from './Board.module.scss';

const Board = () => {
        return <div className={styles.boardWrapper}>
            <DragDropContext>
                <Droppable droppableId="todo">
                    {({provided, snapshot}) => (
                        <TaskList tasks={mockedTasks} provided={provided}></TaskList>
                    )}
                </Droppable>
                <Droppable droppableId="progress">
                    {({provided, snapshot}) => (
                        <TaskList tasks={mockedTasks}></TaskList>
                    )}
                </Droppable>
                <Droppable droppableId="done">
                    {({provided, snapshot}) => (<TaskList tasks={mockedTasks}></TaskList>)}
                </Droppable>
                <Droppable droppableId="problems">
                    {({provided, snapshot}) =>  (<TaskList tasks={mockedTasks}></TaskList>)}
                </Droppable>
            </DragDropContext>
        </div>
}

export default Board;
