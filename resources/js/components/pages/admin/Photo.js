import React, {Component} from 'react';

class Photo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data+ "Hey"}
            </div>
        );
    }
}

export default Photo;