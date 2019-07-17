import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';
import SearchGreetings from './SearchGreetings'
import Greeting from './Greeting';

class GreetingsSection extends Component {
    render() {
        return (
            <div className={"greetingsSection"}>
                <div className={"greetingsTop"}>
                    <div className={"greetingsTitle"}>{StringValues.titleGreetings}</div>
                    <Link className={"linkStyle"} to={"/Sukurti"}>
                        <div className={"greetingsBtn list"}>
                            {StringValues.createBtnGreetings}
                        </div>
                    </Link>
                </div>
                <div className={"greetingsCenter"}>
                    <SearchGreetings width={100}/>
                </div>
                <div className={"greetingsBottom"}>
                    <Greeting/>
                    <Greeting/>
                    <Greeting/>
                    <Greeting/>
                    <Greeting/>
                    <Greeting/>
                </div>
            </div>
        );
    }
}

export default GreetingsSection;