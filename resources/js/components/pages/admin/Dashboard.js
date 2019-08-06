import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import FixedCircle from "../../layouts/FixedCircle";
import GreetingsControl from "../../layouts/admin/GreetingsControl";
import axios from "axios";
import Photo from "../../layouts/admin/Photo";
import Cookie from "universal-cookie";
import CardsControl from "../../layouts/admin/CardsControl";
import TutorialControl from "../../layouts/admin/TutorialControl";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        };
    }

    logout = () => {
        var cookie = new Cookie();
        let self =this;
        axios({
            method: 'get',
            url: '/api/admin/logout',
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }
        })
            .then(function (response) {
                console.log(response.data.logout+" check - "+ response.data.check + " chk2 = " +response.data.check2);
                self.setState({
                    redirect: true
                })
            })
            .catch(error => {
                console.log(error)
            })
    };
    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/"}/>;
        }
    };
    render() {

        return (
            <div className={"dashboard-container"}>
                <FixedCircle/>
                <CardsControl/>
                <GreetingsControl/>
                <TutorialControl/>
                {this.redirect()}
            </div>

        );
    }
}

export default Dashboard;