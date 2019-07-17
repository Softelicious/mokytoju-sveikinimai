import React, {Component} from 'react';
import PublicGreetingCreate from '../layouts/PublicGreetingCreate'

class CreatePublicGreeting extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>

                <div></div>
                <div id="try">
                    <PublicGreetingCreate/>
                </div>
            </div>
        );
    }
}

export default CreatePublicGreeting;