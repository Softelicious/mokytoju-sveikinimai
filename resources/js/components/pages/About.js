import React, {Component} from 'react';
import Navigation from "../layouts/Navigation";

class About extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <Navigation/>
                <div className={"about"}>Kas mes esame</div>
            </div>
        );
    }
}

export default About;