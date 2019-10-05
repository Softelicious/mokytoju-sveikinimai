import React, {Component} from 'react';
import Navigation from '../layouts/Navigation';
import VideoTutorial from "../layouts/VideoTutorial";


class Video extends Component {
    render() {
        return (
            <div className="bookshelfContainer">
                <Navigation/>
                <VideoTutorial/>
            </div>
        );
    }
}

export default Video;