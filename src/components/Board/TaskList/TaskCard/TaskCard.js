import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task = {}, index }) => {
    return <Draggable draggableId={task.id.toString()} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.statement}
      </div>
    )}
  </Draggable>;
}

export default TaskCard;