import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import PublicGreetings from './pages/PublicGreetings';
import CreatePublicGreeting from './pages/CreatePublicGreeting';
import CreateMultipleGreetings from './pages/CreateMultipleGreetings';
import CreateUniqueGreetings from './pages/CreateUniqueGreetings';
import Finish from './pages/Finish';
import Video from './pages/Video';
import Sandbox from './pages/Sandbox';
import Index from './pages/index';
import Error from './pages/Error';
import StringValues from '../StringValues';
import CreateUniquePublicGreeting from "./pages/CreateUniquePublicGreeting";


class Entry extends Component {

    render() {
        return (
                <Router>
                    <Switch>
                        <Route exact path={StringValues.Index_path} component={Index}/>
                        <Route exact path={StringValues.Greetings_path} component={PublicGreetings}/>
                        <Route exact path={StringValues.CreatePublicGreetings_path} component={CreatePublicGreeting}/>
                        <Route exact path={StringValues.CreateUniquePublicGreetings_path} component={CreateUniquePublicGreeting}/>
                        <Route exact path={StringValues.CreateMultipleGreetings_path} component={CreateMultipleGreetings}/>
                        <Route exact path={StringValues.CreateUniqueGreetings_path} component={CreateUniqueGreetings}/>
                        <Route exact path={StringValues.Finish} component={Finish}/>
                        <Route exact path={StringValues.Video_path} component={Video}/>
                        <Route exact path={"/sandbox"} component={Sandbox}/>
                        <Route exact path={StringValues.Error_path} component={Error}/>
                        <Redirect to={StringValues.Error_path}/>
                    </Switch>
                </Router>
        );
    }
}

export default Entry;

if (document.getElementById('root')) {
    ReactDOM.render(<Entry />, document.getElementById('root'));
}
