import React from 'react';

import styles from './Search.module.scss';
import loupe from '../../../icons/loupe.png';

const Search = ({ handleDisplayTaskCreationClick }) => {
    const handleClick = e => {
        e.preventDefault();
    }

    return <div className={styles.container}>
        <form name="searchForm">
            <input type="image" alt="s" src={loupe} onClick={handleClick}/>
            <input placeholder="Search..." type="text"/>
        </form>
        <button onClick={handleDisplayTaskCreationClick}> Create new task </button>
    </div>
}

export default Search;