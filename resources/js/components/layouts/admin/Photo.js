import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";
//import foto from '/public/storage/'


class Photo extends Component {
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
            url: '/api/admin/deleteCard',
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
            <div className={"photo-container"}>
                <div className={"photo-img-wrap"}>
                    <img className={"photo-img"} src={this.props.path} alt="foto"/>
                </div>
                <div onClick={this.delete} className="photo-close fas fa-times fa-2x"></div>
            </div>
        );
    }
}

export default Photo;