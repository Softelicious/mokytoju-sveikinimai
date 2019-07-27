import React, {Component} from 'react';
import StringValues from "../../../StringValues";
import axios from "axios";
import Cookies from "universal-cookie";
import Photo from "./Photo";
import GreetingText from "./GreetingText";

class LandingBottomAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            greetings: []
        }
    }
    componentWillMount() {
        this.load();
    }

    load = () => {
        var self = this;
        var cookie = new Cookies();
        axios({
            method: 'get',
            url: '/api/admin/getGreetings',
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        })
            .then(function (response) {
                self.setState({
                    greetings: response.data
                });
                console.log(response.data)
            })
            .catch(function (response) {
                alert("Nepavyko ikelt teksto")
            });
    };
    submit = (e) => {
        e.preventDefault();
        var cookie = new Cookies();
        var self = this;
        var bodyFormData = new FormData;
        bodyFormData.append('text', this.state.text);
        axios({
            method: 'post',
            url: '/api/admin/uploadGreetings',
            data: bodyFormData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        })
            .then(function (response) {
                self.load();
            })
            .catch(function (response) {
                alert("Nepavyko ikelt teksto")
            });

        this.setState({
            text: '',
        });

    };
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };
    render() {
        return (
            <div id={"container"}>
                <div id={"add-greetings-title"}>
                    Sveikinimai
                </div>
                <div id={"add-greetings-content"}>
                    <form onSubmit={this.submit} className={"add-greetings-form"}>
                        <input onChange={this.onChange} className={"add-greetings-input"} type="text" name="" id="" placeholder={"Įvesk sveikinimą"} value={this.state.text}/>
                        <input className={"add-greetings-submit"} type="submit" value={"Įkelk"}/>
                    </form>
                    <div className={"add-greetings-greetingsContainer"}>
                        {
                            this.state.greetings.map((data) =>
                                <GreetingText key={data.id} text={data.greeting}/>
                            )

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingBottomAdmin;
