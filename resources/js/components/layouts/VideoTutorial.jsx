import React, {Component} from 'react';
//import vid from '-!file-loader!../../../../public/assets/video.mp4';
import StringValues from '../../StringValues';
import {Link} from 'react-router-dom';

class VideoTutorial extends Component {

    render() {
        return (
            <div id={"videoContainer"}>
                <div className="video">
                    <video className="video-player" src={'/video.mp4'} preload="none" autoPlay={false}>
                        {/*<source src={vid} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>*/}
                        <p>Sorry, but your browser does not support this video format.</p>
                    </video>
                    <span className="action action-close">
                        <i className="fas fa-window-close"></i></span>
                </div>
                <div className="pre-video">
                    <div className="loader">
                        <i className="fa fa-spinner fa-pulse"></i>
                    </div>
                    <div className="play">
                        <i className="big-icon fa fa-play-circle "></i>
                    </div>
                    <div className="tutorial-description">
                        {StringValues.tutorial_description}
                    </div>
                    <div className={"close-tutorial"}>
                        <Link className={"linkStyle"} to={"/"}>
                            <i className=" fas fa-times fa-2x"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoTutorial;