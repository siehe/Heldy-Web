import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../../../../store/actions/editTask';
import { loadUserList } from '../../../../store/actions/userList';
import { loadUserCategories } from '../../../../store/actions/userCategories';
import { showWarning } from '../../../../store/actions/warning';

import styles from './TaskCard.module.scss';
import { alerts } from '../../../../constants/warning';

const TaskCard = ({ task = {}, index }) => {
    const dispatch = useDispatch(); 
    const isEditTaskShown = useSelector(store => store.isEditTaskShown);
    const isWarningShown = useSelector(store => store.isWarningShown);

    const { status: { id } } = task;
    const isTaskProblems = id === 5;

    const handleClick = () => {
      dispatch(editTask({
        task,
        isEditTaskShown: !isEditTaskShown,
      }));
    };

    const handleAddToForum = () => {
      fetch('https://heldy-api-pupi.azurewebsites.net/tasks/' + task.id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id: task.id,
          deadline: task.deadline,
          description: task.description,
          statement: task.statement,
          subjectId: task.subejct.id,
          assigneeId: task.assignee.id,
          authorId: task.author.id,
          typeId: task.type.id,
          statusId: task.status.id,
          isInQa: true,
        }), 
      })
      .then(res => {
        if(res.ok) {
          dispatch(showWarning({ show: !isWarningShown, text: alerts.addedToForum.text, header: alerts.addedToForum.header }));
        }
      }).catch(e => console.log(e.message));
    };

    const handleDelete = () => {
      fetch('https://heldy-api-pupi.azurewebsites.net/tasks/' + task.id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      }).then(res => {
        if(res.ok) {
          dispatch(loadUserCategories());
          dispatch(loadUserList(localStorage.getItem('userId')));
        }
      }).catch(e => console.log(e.message));
    };

    return <Draggable draggableId={task.id.toString()} index={index}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        className={styles.wrapper}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.subject}>{task.statement}</span>
              <span className={styles.lecturer}>{task.author.surname && ("Lecturer: " + task.author.name + " "  + task.author.surname.split("")[0].toUpperCase() + ".")}</span> 
            </div>
            {isTaskProblems && <img src="https://image.flaticon.com/icons/png/512/64/64703.png" alt="problems" onClick={handleAddToForum}/>}
          </div>
          <div className={styles.description}>
            <span className={styles.typeName}>{task.type.name || ''}</span>
            <span>Due:</span> <p>{(new Date(task.deadline)).toDateString() || ''}</p>
            <button onDoubleClick={handleClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )}
  </Draggable>;
}

export default TaskCard;