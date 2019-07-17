import React, {Component} from 'react';
import Teacher from "../layouts/Teacher";

class Sandbox extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <div className={"sandboxContainer"}>
                    <Teacher/>
                    <Teacher/>
                    <Teacher/>
                    <Teacher/>
                </div>
            </div>
        );
    }
}

export default Sandbox;