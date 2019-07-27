import React, {Component} from 'react';
//import foto from '/public/storage/'


class Photo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"photo-container"}>
                <div className={"photo-img-wrap"}>
                    <img className={"photo-img"} src={this.props.path} alt="foto"/>
                </div>
                <div className="photo-close fas fa-times fa-2x"></div>
            </div>
        );
    }
}

export default Photo;