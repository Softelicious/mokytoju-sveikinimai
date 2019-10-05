import React, {Component} from 'react';
import Navigation from "../layouts/Navigation";
import CardNormal from "../layouts/CardNormal";

class OpenedGreeting extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <Navigation/>
                <CardNormal
                    teacher={this.props.location.state.teacher}
                    school={this.props.location.state.school}
                    student={this.props.location.state.student}
                    card={this.props.location.state.card}
                    greeting={this.props.location.state.greeting}
                    picture={this.props.location.state.picture}
                />
            </div>
        );
    }
}

export default OpenedGreeting;