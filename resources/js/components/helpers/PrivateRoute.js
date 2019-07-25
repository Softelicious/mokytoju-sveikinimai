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
            console.log(response.data.auth);
            return response.data.auth;
        })
        .catch(function (response) {
            console.log("Klaida isAuthenticated PrivateRoute");
            return false;
        });
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props}/>

        ) : (
            <Redirect to={{
                pathname: '/login',
               state: {from: props.location }
            }}/>
        )
    )}/>
);

export default PrivateRoute;