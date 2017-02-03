import React from 'react';
import { Router, Route, Link, IndexRoute, Redirect ,hashHistory} from 'react-router';

import Menu from './components/menu';
import NewContent from './components/feeds/newContent';
import ShowContent from './components/feeds/showContent';
import JobsContent from './components/feeds/jobsContent';
import AboutContent from './components/feeds/aboutContent';
import Profile from './components/user/profile';
import PageNotFound from './components/errorPage';
import './styles/master.scss';

//Target element to render the components
let target = document.getElementById('main-container');


let Header = React.createClass({
    render() {
        return (
            <div className="header"></div>
        );
    }
});

const App = ({children})=>(
    <div>
        <Header/>
        <Menu/>
        <div className="container">
            <a className="goto-top" onClick={()=> document.body.scrollTop = 0}></a>
            {children}
        </div>
    </div>
);

// Make a new component to render inside of Inbox
const Message = React.createClass({
    render() {
        return <h3>Message</h3>
    }
});

let redirectToChild = (location, replaceState) => {
    replaceState(null, '/new');
};

//Render the components
export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <IndexRoute  component={NewContent} onEnter={redirectToChild}/>
            <Route path="new" component={NewContent} />
            <Route path="show" component={ShowContent} />
            <Route path="jobs" component={JobsContent} />
            <Route path="about" component={AboutContent} />
            <Route path="user/:id" component={Profile} />
            <Route path="*" component={PageNotFound}/>
        </Route>
    </Router>
);


/**

 * */
