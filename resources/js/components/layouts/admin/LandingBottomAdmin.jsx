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
            greetings: [],
            submit: 'Įkelk',
            id: 0
        }
    }
    componentWillMount() {
        this.load();
    }

    load = () => {
        var self = this;
        axios({
            method: 'get',
            url: '/api/getGreetings',
        })
            .then(function (response) {
                self.setState({
                    greetings: response.data.greetings
                });
                console.log(response.data)
            })
            .catch(function (response) {
                alert("Nepavyko atnaujinti teksto")
            });
    };
    submit = (e) => {
        e.preventDefault();
        var cookie = new Cookies();
        var self = this;

        if(this.state.submit === "Įkelk"){
            var bodyFormData = new FormData;
            bodyFormData.append('text', this.state.text);
            axios({
                method: 'post',
                url: '/api/admin/uploadGreeting',
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
        }else{
            this.setState({
                submit: "Įkelk"
            });
            var bodyFormDataa = new FormData;
            bodyFormDataa.append('text', this.state.text);
            bodyFormDataa.append('index', this.state.id);
            axios({
                method: 'post',
                url: '/api/admin/updateGreeting',
                data: bodyFormDataa,
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
        }

        this.setState({
            text: '',
        });

    };
    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };
    edit = (text, id) =>{
        this.setState({
            text: text,
            submit: "Pakeisk",
            id: id
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
                        <input className={"add-greetings-submit"} type="submit" value={this.state.submit}/>
                    </form>
                    <div className={"add-greetings-greetingsContainer"}>
                        {
                            this.state.greetings.map((data) =>
                                <GreetingText edit={this.edit} load={this.load} key={data.id} id={data.id} text={data.greeting}/>
                            )

                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default LandingBottomAdmin;
