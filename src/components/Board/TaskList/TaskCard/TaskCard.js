import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({task = {}, index}) => {
    return <Draggable key={Math.random()} draggableId={Math.random()} index={index}>
        {(provided, snapshot) => (<div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    >
                    {task.name}
                </div>)
        }
    </Draggable>;
}

export default TaskCard;