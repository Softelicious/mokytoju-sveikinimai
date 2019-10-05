import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import FixedCircle from "../../layouts/FixedCircle";
import GreetingsControl from "../../layouts/admin/GreetingsControl";
import axios from "axios";
import Photo from "../../layouts/admin/Photo";
import Cookie from "universal-cookie";
import CardsControl from "../../layouts/admin/CardsControl";
import TutorialControl from "../../layouts/admin/TutorialControl";
import VideosControl from "../../layouts/admin/VideosControl";
import VideosControl2 from "../../layouts/admin/VideoControl2";
import LandingBottom from "../../layouts/LandingBottom";
import PublicGreetingsControl from "../../layouts/admin/PublicGreetingsControl";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {

        return (
            <div className={"dashboard-container"}>
                <FixedCircle/>
                <CardsControl/>
                <GreetingsControl/>
                <TutorialControl/>
                {/*<VideosControl/>*/}
                <VideosControl2/>
                <PublicGreetingsControl/>
            </div>

        );
    }
}

export default Dashboard;