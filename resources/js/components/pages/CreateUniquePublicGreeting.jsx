import React, {Component} from 'react';
import PublicGreetingCreate from "../layouts/PublicGreetingCreate";
import UniquePublicGreetingCreate from "../layouts/UniquePublicGreetingCreate";

import {NotificationContainer} from "react-notifications";


class CreateUniquePublicGreeting extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <div id="try">
                    <UniquePublicGreetingCreate/>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default CreateUniquePublicGreeting;