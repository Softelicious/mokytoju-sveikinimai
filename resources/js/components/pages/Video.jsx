import React, {Component} from 'react';
import Navigation from '../layouts/Navigation';
import VideoTutorial from "../layouts/VideoTutorial";
import axios from 'axios';


class Video extends Component {
    render() {
        return (
            <div className="bookshelfContainer">
                <Navigation/>
                <VideoTutorial/>
            </div>
        );
    }
    componentDidMount() {
        axios.get("/api/data")
            .then(res =>
                console.log("Gauna"+res.data)
            ).catch( err => "Klaida"+console.log(err))
    }
}

export default Video;