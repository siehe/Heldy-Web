import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './TaskCard.module.scss';

const TaskCard = ({ task = {}, index }) => {
    return <Draggable draggableId={task.id.toString()} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <span>{task.author.name + " "  + task.author.surname.split("")[0].toUpperCase() + "."}</span>
          </div>
          <div className={styles.description}>
            <span>{task.statement}</span>
          </div>
        </div>
      </div>
    )}
  </Draggable>;
}

export default TaskCard;