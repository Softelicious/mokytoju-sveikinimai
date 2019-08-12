import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';


class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: 'translateY(-100%)',
            toggle: false
        }
    }
    toggle = () => {
        this.setState((prevState) => {
            if(prevState.toggle){
                return {
                    toggle: false,
                    style: 'translateY(-100%)'
                }
            }else{
                return {
                    toggle: true,
                    style: 'translateY(30px)'
                }
            }
        })
    };

    render() {
        return (
            <>
                <nav id={"nav"}>
                    <ul id={"ul"}>
                        <Link className={"linkStyle"} to={StringValues.Greetings_path}>
                            <li id={"greetingsBtn"} className={"list"}>
                                {StringValues.buttonGreetings + " Demo"}
                            </li>
                        </Link>
                        <Link className={"linkStyle"} to={StringValues.Video_path}>
                            <li id={"moreBtn"} className={" list"}>
                                {StringValues.buttonInfo}
                            </li>
                        </Link>
                        <Link className={"linkStyle"} to={"/about"}>
                            <li id={"aboutBtn"} className={" list"}>
                                {StringValues.buttonAbout}
                            </li>
                        </Link>

                    </ul>
                </nav>
                <nav id={"nav-toggled"}>
                    <div id={"nav-listener"}>
                        <div onClick={this.toggle} className={"nav-btn fas fa-bars fa-2x"}></div>
                    </div>
                    <ul id={"ul-toggled"} style={{transform: this.state.style}}>
                        <Link className={"linkStyle"} to={StringValues.Greetings_path}>
                            <li id={"greetingsBtn"} className={"list"}>
                                {StringValues.buttonGreetings}
                            </li>
                        </Link>
                        <Link className={"linkStyle"} to={StringValues.Video_path}>
                            <li id={"moreBtn"} className={" list"}>
                                {StringValues.buttonInfo}
                            </li>
                        </Link>
                        <Link className={"linkStyle"} to={"/about"}>
                            <li id={"aboutBtn"} className={" list"}>
                                {StringValues.buttonAbout}
                            </li>
                        </Link>

                    </ul>
                </nav>
            </>
        );
    }
}

export default Navigation;