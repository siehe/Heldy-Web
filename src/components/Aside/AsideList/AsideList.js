import React from 'react';

import { pagesNames } from '../../../constants/pages';
import AsideListItem from './AsideListItem/AsideListItem';

import './AsideList.module.scss';

const AsideList = () => {
    return <ul> {Object.values(pagesNames).map(page => (<AsideListItem page={page}/>))}</ul>
};

export default AsideList;