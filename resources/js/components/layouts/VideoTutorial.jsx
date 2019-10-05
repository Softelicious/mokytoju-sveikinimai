import React, {Component} from 'react';
import StringValues from '../../StringValues';
import {Link} from 'react-router-dom';
import axios from 'axios';


class VideoTutorial extends Component {
    constructor(props){
        super(props);
        this.state = {
            tutorial: '',
            displayVid: 'none',
            displayPre: 'block',
            name: '',
            description: '',

        }
    }


    componentWillMount() {

        axios.get('/api/getTutorial')
            .then(response => {
                this.setState({
                    tutorial: response.data.tutorial[0].video,
                    name: response.data.tutorial[0].name,
                    description: response.data.tutorial[0].description,
                })
            })
            .catch(response => {
                console.log(response)
            })
    }

    play = () => {
        this.setState({
            displayVid: 'block',
            displayPre: 'none'
        })
    };

    render() {

        return (

            <div id={"videoContainer"}>
                <div className="video" style={{display: this.state.displayVid}}>
                    <video src={this.state.tutorial} controls >
                        {/*<source src={vid} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>*/}
                        <p>Sorry, but your browser does not support this video format.</p>
                    </video>
                </div>
                <div className="pre-video" style={{display: this.state.displayPre}}>
                    <div className="loader">
                        <i className="fa fa-spinner fa-pulse"></i>
                    </div>
                    <div onClick={this.play} className="play">
                        <i className="big-icon fa fa-play-circle "></i>
                    </div>
                    <div className="tutorial-description">
                        {this.state.description}
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