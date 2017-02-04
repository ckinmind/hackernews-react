import React from 'react';
import { Router, Route, Link, IndexRoute, Redirect ,hashHistory, IndexRedirect} from 'react-router';

import Menu from './components/menu';
import NewContent from './components/feeds/newContent';
import ShowContent from './components/feeds/showContent';
import JobsContent from './components/feeds/jobsContent';
import AboutContent from './components/feeds/aboutContent';
import Profile from './components/user/profile';
import PageNotFound from './components/errorPage';
import './styles/master.scss';


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


//Render the components
export default () => (
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <IndexRedirect to="new" />
            <Route path="new" component={NewContent} />
            <Route path="show" component={ShowContent} />
            <Route path="jobs" component={JobsContent} />
            <Route path="about" component={AboutContent} />
            <Route path="user/:id" component={Profile} />
            <Route path="*" component={PageNotFound}/>
        </Route>
    </Router>
);