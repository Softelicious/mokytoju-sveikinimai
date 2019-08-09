import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";

class Video extends Component {
    constructor(props) {
        super(props);
    }

    delete = () => {
        var self = this;
        var cookie = new Cookie();
        const formData = new FormData();
        formData.append(`index`, this.props.id);
        formData.append(`name`, this.props.path);

        axios({
            method: 'post',
            url: '/api/admin/deleteVideo',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }
        })
            .then(function (response) {
                self.props.load();
            })
            .catch(error => {
                console.log(error)
            })
    };
    render() {
        return (
            <div className={"video-item-container"}>
                <div className={'video-wrapper'}>
                    <video id="myVideo" className="tutorial-player" src={ this.props.path} controls>
                        <source src={this.props.path} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>
                        <p>Sorry, but your browser does not support this video format.</p>

                    </video>
                    <div onClick={this.delete} className="video-close fas fa-times fa-2x"></div>
                </div>
            </div>
        );
    }
}

export default Video;