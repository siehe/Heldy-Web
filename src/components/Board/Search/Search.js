import React from 'react';

import './Search.module.scss';
import loupe from '../../../icons/loupe.png';

const Search = () => {
    const handleClick = e => {
        e.preventDefault();
    }

    return <div>
        <form name="searchForm">
            <input type="image" alt="s" src={loupe} onClick={handleClick}/>
            <input placeholder="Search..." type="text"/>
        </form>
    </div>
}

export default Search;