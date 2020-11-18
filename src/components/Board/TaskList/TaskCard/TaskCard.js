import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../../../../store/actions/editTask';
import { loadUserList } from '../../../../store/actions/userList';
import { loadUserCategories } from '../../../../store/actions/userCategories';

import styles from './TaskCard.module.scss';

const TaskCard = ({ task = {}, index }) => {
    const dispatch = useDispatch(); 
    const isEditTaskShown = useSelector(store => store.isEditTaskShown);

    const handleClick = () => {
      dispatch(editTask({
        task,
        isEditTaskShown: !isEditTaskShown,
      }));
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
            <span className={styles.subject}>{task.statement}</span>
            <span className={styles.lecturer}>{"Lecturer: " + task.author.name + " "  + task.author.surname.split("")[0].toUpperCase() + "."}</span>
          </div>
          <div className={styles.description}>
            <span className={styles.typeName}>{task.type.name}</span>
            <span>Due:</span> <p>{(new Date(task.deadline)).toDateString()}</p>
            <button onDoubleClick={handleClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )}
  </Draggable>;
}

export default TaskCard;