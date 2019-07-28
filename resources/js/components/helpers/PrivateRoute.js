import {Redirect, Route} from "react-router";
import React, {Component} from 'react';
import axios from "axios"
import StringValues from "../../StringValues";
import Cookie from 'universal-cookie'

// function isAuthenticated(){
//     const cookie = new Cookie();
//
//     axios.get("/api/check", {
//         headers : {
//             'Authorization' : 'Bearer ' + cookie.get('access_token')
//         }})
//         .then(function (response) {
//             console.log(response.data.auth+" data-auth");
//             return response.data.auth;
//         })
//         .catch(function (response) {
//             console.log("Klaida isAuthenticated PrivateRoute");
//             return false;
//         });
// }

class PrivateRoute extends React.Component {
    constructor(props){
        super(props);
        this.state={
            auth: false,
            res: false
        }
    }
    componentWillMount() {
        const cookie = new Cookie();
        let self =this;
        axios.get("/api/admin/check", {
            headers : {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }})
            .then(function (response) {
                self.setState({
                    auth: response.data.auth,
                    res: true
                });
                console.log(self.state.auth)
            })
            .catch(function (response) {
                console.log("Klaida isAuthenticated PrivateRoute");
                self.setState({
                    auth: false,
                    res: true
                });
            });
    }


    // authentication = () =>{
    //     const cookie = new Cookie();
    //     var self =this;
    //     axios.get("/api/check", {
    //         headers : {
    //             'Authorization' : 'Bearer ' + cookie.get('access_token')
    //         }})
    //         .then(function (response) {
    //             self.setState({
    //                 auth: response.data.auth
    //             })
    //         })
    //         .catch(function (response) {
    //             console.log("Klaida isAuthenticated PrivateRoute");
    //             self.setState({
    //                 auth: false
    //             })
    //         });
    // };

     render() {
         const {component: Component, ...rest} = this.props;
         const renderRoute = props => {
            const to = {
                pathname: '/login',
                state: {from: props.location}
            };
            console.log(this.state.auth);
            if (this.state.auth) return (<Component {...props} />);
            return (<Redirect to={to}/>);

        };

         if(this.state.res){
             return (
                 <Route {...rest} render={renderRoute}/>
             );
         }else{
             return (
                 'loading..'
             );
         }
    }
}
export default PrivateRoute;