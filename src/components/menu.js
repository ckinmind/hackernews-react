import React from 'react';
import { Link } from 'react-router';

const Menu = () => (
    <div className="menu">
        <ul>
            <li><Link to='/new' activeClassName="selected"> new </Link></li>
            <li><Link to='/show' activeClassName="selected"> show </Link></li>
            <li><Link to='/jobs' activeClassName="selected"> jobs </Link></li>
            <li><Link to='/about' activeClassName="selected"> about </Link></li>
        </ul>
    </div>
);


export default Menu;