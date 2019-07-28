import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";

class GreetingText extends Component {
    constructor(props) {
        super(props);
    }

    clickEdit = (e) =>{
        this.props.edit(this.props.text, this.props.id);
    };

    clickClose = () => {
        var self = this;
        var cookie = new Cookie();
        const formData = new FormData();
        formData.append(`index`, this.props.id);

        axios({
            method: 'post',
            url: '/api/admin/deleteGreeting',
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
            <div className={"greetingText-container"}>
                <div className={"greetingText-text"}>
                    {this.props.text}
                </div>
                <div onClick={this.clickEdit} className="greetingText-edit fas fa-edit fa-2x"></div>
                <div onClick={this.clickClose} className="greetingText-close fas fa-times fa-2x"></div>
            </div>
        );
    }
}

export default GreetingText;