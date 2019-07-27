import React, {Component} from 'react';

class GreetingText extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"greetingText-container"}>
                <div className={"greetingText-text"}>
                    {this.props.text}
                </div>
                <div className="greetingText-edit fas fa-edit fa-2x"></div>
                <div className="greetingText-close fas fa-times fa-2x"></div>
            </div>
        );
    }
}

export default GreetingText;