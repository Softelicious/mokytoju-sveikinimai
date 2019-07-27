import React, {Component} from 'react';
import StringValues from "../../StringValues";
import axios from "axios";
import { Redirect} from "react-router-dom";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
            redirect: false
        }
    }
    submit = (e) => {
        e.preventDefault();
        var self = this;
        this.setState({
            name: '',
            password: '',

        });
        var bodyFormData = new FormData;
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('password', this.state.password);
        axios({
            method: 'post',
            url: '/api/register',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    redirect: true
                });
                console.log(self.state.redirect);
            })
            .catch(function (response) {
                alert("Nepavyko")
            });
    };
    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/login"}/>;
        }
    };
    changeName = (e) => {
        this.setState({
            name: e.target.value,
        })
    };
    changePass = (e) => {
        this.setState({
            password: e.target.value,
        })
    };
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.submit}>
                    <input onChange={this.changeName} name={"name"} type="text" placeholder={"name"} value={this.state.name}/>
                    <input onChange={this.changePass} name={"password"} type="password" placeholder={"password"} value={this.state.password}/>
                    <input type="submit" value={"submit"}/>
                </form>
                {this.redirect()}
            </div>
        );
    }
}

export default Register;