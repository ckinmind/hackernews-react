import React from 'react';
import { Link } from 'react-router';
import {convertTime} from '../util/util.js';

const Item = ({response}) => (
    <div className="content">
        <a className="title" target="_blank" href={response.url}>
            {response.title}
        </a>

        <div className={response.domain ? 'domain': 'hide'}>
            (<a href={'http://' + response.domain} title="Domain"> {response.domain} </a>)
        </div>

        <div className="bottom-content">
            <span>{response.score} {(response.score > 1) ? ' points' : ' point'} </span>
            <span>by <Link className="author" to={'/user/' + response.by}>{response.by}</Link></span>
            <span> | {convertTime(response.time)} </span>
            <a href={'https://www.google.co.in/search?q=' + response.title} target="_blank" className="search-web"> | <span>web</span></a>
        </div>
    </div>
);

export default Item;