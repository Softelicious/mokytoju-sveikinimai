import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import PublicGreetings from './pages/PublicGreetings';
import CreatePublicGreeting from './pages/CreatePublicGreeting';
import TeacherSearchHeading from './pages/TeacherSearchHeading';
import CreateUniqueGreetings from './pages/CreateUniqueGreetings';
import Finish from './pages/Finish';
import Video from './pages/Video';
import Sandbox from './pages/Sandbox';
import Index from './pages/index';
import Error from './pages/Error';
import StringValues from '../StringValues';
import CreateUniquePublicGreeting from "./pages/CreateUniquePublicGreeting";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./helpers/PrivateRoute";
import About from "./pages/About";
import OpenedGreeting from "./pages/OpenedGreeting";
import Cookie from "universal-cookie";
import PrivateGeneratedGreeting from "./pages/private-greetings/PrivateGeneratedGreeting/PrivateGeneratedGreeting";
import PrivateUniqueGreeting from "./pages/private-greetings/PrivateUniqueGreeting/PrivateUniqueGreeting";

class Entry extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route exact path={StringValues.Index_path} component={Index}/>
                        <Route exact path={StringValues.Greetings_path} component={PublicGreetings}/>
                        <Route exact path={StringValues.CreatePublicGreetings_path} component={CreatePublicGreeting}/>
                        <Route exact path={StringValues.CreateUniquePublicGreetings_path} component={CreateUniquePublicGreeting}/>
                        <Route exact path={StringValues.CreateMultipleGreetings_path} component={TeacherSearchHeading}/>
                        <Route exact path={StringValues.CreateUniqueGreetings_path} component={CreateUniqueGreetings}/>
                        <Route exact path={StringValues.Finish} component={Finish}/>
                        <Route exact path={StringValues.Video_path} component={Video}/>
                        <Route exact path={StringValues.OpenedGreeting} component={OpenedGreeting}/>
                        {/*<Route exact path={"/register"} component={Register}/>*/}
                        <Route exact path={"/login"} component={Login}/>
                        <PrivateRoute exact path={"/admin"} component={Dashboard}/>
                        <Route exact path={"/about"} component={About}/>
                        <Route exact path={StringValues.Error_path} component={Error}/>
                        <Route exact path={StringValues.private_usual_card_path+'/:id'} component={PrivateGeneratedGreeting}/>
                        <Route exact path={StringValues.private_unique_card_path+'/:id'} component={PrivateUniqueGreeting}/>
                        <Redirect to={StringValues.Error_path}/>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default Entry;

if (document.getElementById('root')) {
    ReactDOM.render(<Entry />, document.getElementById('root'));
}
