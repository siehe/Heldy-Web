import React from 'react';

import styles from './Search.module.scss';
import loupe from '../../../icons/loupe.png';

const Search = ({ handleDisplayTaskCreationClick }) => {
    const handleClick = e => {
        e.preventDefault();
    }

    return <div className={styles.container}>
        <form name="searchForm">
            <input placeholder="Search..." type="text"/>
            <input type="image" alt="s" src={loupe} onClick={handleClick}/>
        </form>
        <button onClick={handleDisplayTaskCreationClick}> Create new task </button>
    </div>
}

export default Search;