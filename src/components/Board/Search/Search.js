import React, { useState } from 'react';

import styles from './Search.module.scss';
import loupe from '../../../icons/loupe.png';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ handleDisplayTaskCreationClick }) => {
    const { userTasksList } = useSelector(store => store);
    const [ searchValue, setSearchValue ] = useState('');
    const dispatch = useDispatch();

    const searching = (word) => {
        let filtered = [];
        for (let i = 0; i < userTasksList.length; i++) {
          const regex = new RegExp(word, 'gi');
          if (userTasksList[i].statement.match(regex)) {
            filtered.unshift(userTasksList[i]);
          }
        }
        return filtered;
      }

    const handleChange = e => {
        setSearchValue(e.target.value);
    }

    const handleClick = e => {
      e.preventDefault();
      const searched = searching(searchValue);
      dispatch({ type: 'SET_SEARCHED_TASKS', searchedTasks: searched });
    }

    return <div className={styles.container}>
        <form name="searchForm">
            <input placeholder="Search..." type="text" onChange={handleChange}/>
            <input type="image" alt="s" src={loupe} onClick={handleClick}/>
        </form>
        <button onClick={handleDisplayTaskCreationClick}> Create new task </button>
    </div>
}

export default Search;