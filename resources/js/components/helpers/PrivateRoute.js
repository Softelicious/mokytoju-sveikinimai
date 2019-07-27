import {Redirect, Route} from "react-router";
import React, {Component} from 'react';
import axios from "axios"
import StringValues from "../../StringValues";
import Cookie from 'universal-cookie'

async function isAuthenticated(){
    const cookie = new Cookie();

    axios.get("/api/check", {
        headers : {
            'Authorization' : 'Bearer ' + cookie.get('access_token')
        }})
        .then(function (response) {
            console.log(response.data.auth+" data-auth");
            return response.data.auth;
        })
        .catch(function (response) {
            console.log("Klaida isAuthenticated PrivateRoute");
            return false;
        });
}

class PrivateRoute extends React.Component {
    render() {
        const {component: Component, ...rest} = this.props;

        const renderRoute = props => {
            if (isAuthenticated()) {
                return (
                    <Component {...props} />
                );
            }

            const to = {
                pathname: '/login',
                state: {from: props.location}
            };

            return (
                <Redirect to={to} />
            );
        };

        return (
            <Route {...rest} render={renderRoute}/>
        );
    }
}
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest}
//         render={props =>
//             if(isAuthenticated()){
//             <Component {...props}/>
//         }else{
//             <Redirect to={{
//                 pathname: '/login',
//                 state: {from: props.location }
//             }}/>
//         }
//
//         }
//     />
// );

export default PrivateRoute;
//
// isAuthenticated() ?
//     <Component {...props}/>
//
//     :
//     <Redirect to={{
//         pathname: '/login',
//         state: {from: props.location }
//     }}/>

// if(isAuthenticated()){
//     <Component {...props}/>
// }else{
//     <Redirect to={{
//         pathname: '/login',
//         state: {from: props.location }
//     }}/>
// }