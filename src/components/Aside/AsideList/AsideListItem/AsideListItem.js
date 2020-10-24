import React from 'react';
import { Link } from 'react-router-dom';

const AsideListItem = ({ page : {name, path, src}}) => {
    return <li>
            <Link to={path}>
                {src ? <img src={src} alt="here"/> : null}
                <span>{name}</span>
            </Link>
        </li>;
}

export default AsideListItem;