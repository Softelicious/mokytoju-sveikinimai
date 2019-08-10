import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';


class Navigation extends Component {
    render() {
        return (

            <nav id={"nav"}>
                <ul id={"ul"}>
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
        );
    }
}

export default Navigation;