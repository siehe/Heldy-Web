import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard/TaskCard';
import styles from './TaskList.module.scss';

const TaskList = ({tasks = [], name, id }) => {
    return <div className={styles.listWrapper}>
        <h5>{name}</h5>
        <Droppable droppableId={id.toString()} className={styles.column}>
            {(provided, snapshot) =>
            <div {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}>
                    {(tasks.map((task, index) => (<TaskCard task={task} key={task.id} index={index}/>)))}
                {provided.placeholder}
            </div>}
        </Droppable>
    </div>
};

export default TaskList;