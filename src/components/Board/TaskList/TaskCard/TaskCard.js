import React, { useState } from 'react';
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

  const [grade, setGrade] = useState('');
  const [isUrgent, setUrgency] = useState(false);
  const [isAnon, setAnon] = useState(false);
  const userRole = +localStorage.getItem('role');
  const isWarningShown = useSelector(store => store.isWarningShown);


  const { status: { id } } = task;
  const isTaskProblems = id === 5;
  const userId = localStorage.getItem('userId');
  const authorId = task.author.id;
  const isYourTask = userId === authorId;

  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

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
        // TODO
      }),
    })
      .then(res => {
        if (res.ok) {
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
      if (res.ok) {
        dispatch(loadUserCategories());
        dispatch(loadUserList(localStorage.getItem('userId')));
      }
    }).catch(e => console.log(e.message));
  };

  const gradeSubmitHandler = () => {
    const body = {
      id: task.id,
      grade: Number.parseInt(grade)
    }

    fetch('https://heldy-api-pupi.azurewebsites.net/updateGrade', {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token'),
      },
      body: JSON.stringify(body)
    }).then(() => {
      dispatch(loadUserCategories());
      dispatch(loadUserList(localStorage.getItem('userId')));
    })
  }

  const getComments = () => {
    let arr = [];
    task.comments.forEach(item => {
      const res = urlRegex.exec(item.text);
      if (res !== null) {
        arr.push(res[0])
      }
    })
    return arr;
  }
  const comments = getComments();

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
            <div className={styles.info}>
              <div className={styles.headerContent}>
                <span className={styles.subject}>{task.statement}</span>
                <span className={styles.lecturer}>{task.author.surname && ("Lecturer: " + task.author.name + " " + task.author.surname.split("")[0].toUpperCase() + ".")}</span>
              </div>
              {isTaskProblems && <img src="https://image.flaticon.com/icons/png/512/64/64703.png" alt="problems" onClick={handleAddToForum} />}
            </div>
            {isTaskProblems && <div className={styles.checkDiv}><input type="checkbox" onChange={(e) => setUrgency(!isUrgent)} /><label>Urgent</label></div>}
            {isTaskProblems && <div className={styles.checkDiv}><input type="checkbox" onChange={(e) => setAnon(!isAnon)} /><label>Anonymous</label></div>}
          </div>
          <div className={styles.description}>
            <span className={styles.typeName}>{task.type.name || ''}</span>
            <span>Due:</span> <p>{(new Date(task.deadline)).toDateString() || ''}</p>
            {comments.length > 0
              ? <div>
                {comments.map((item, index) => <a href={item}>Resourse {index + 1}</a>)}
              </div>
              : null}

            {task.status.name === 'Done'
              ? <span>{task.grade}</span>
              : null}

            {task.status.name === 'Examination' && userRole === '1'
              ? <div>
                <input type="number" min="0" pattern="^-\d$" placeholder='grade' onChange={(event => setGrade(event.target.value))} />
                <button onClick={() => gradeSubmitHandler()}>submit</button>
              </div>
              : null}

            <button onDoubleClick={handleClick}>Edit</button>
            {!isYourTask && (<button onClick={handleDelete}>Delete</button>)}
          </div>
        </div>
      </div>
    )}
  </Draggable>;
}

export default TaskCard;