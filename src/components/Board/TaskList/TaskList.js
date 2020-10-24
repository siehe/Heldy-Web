import React from 'react';
import TaskCard from './TaskCard/TaskCard';
import styles from './TaskList.module.scss';

const TaskList = ({tasks = [], colomnName = 'Colomn', provided}) => {
    return <div className={styles.listWrapper}>
        <h2>{colomnName}</h2>
        {tasks.map((task, index) => (<TaskCard task={task} key={task.name} index={index}/>)
        )}
    </div>
};

export default TaskList;