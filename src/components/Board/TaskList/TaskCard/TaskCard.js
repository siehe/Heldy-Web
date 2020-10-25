import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({task = {}, index}) => {
    return <Draggable draggableId={task.name} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.name}
      </div>
    )}
  </Draggable>;
}

export default TaskCard;