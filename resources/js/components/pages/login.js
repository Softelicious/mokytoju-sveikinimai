import React, {Component} from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import {Redirect} from "react-router";

class Login extends Component {
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
        var bodyFormData = new FormData;
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('password', this.state.password);
        axios({
            method: 'post',
            url: '/api/login',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                if(response.data.auth){
                    var cookies = new Cookies();
                    cookies.set('access_token', response.data.access_token, { path: '/' });
                    self.setState({
                        redirect: true
                    })
                }else{
                    alert("Neprisijungei")
                }
            })
            .catch(function (response) {
                alert("Nepavyko")
            });

        this.setState({
            name: '',
            password: ''
        });

    };
    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/admin"}/>;
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
            <div className={"bookshelfContainer"}>
                <div></div>
                <div className={"login-container"}>
                    <h1 className={"login-title"}>Login</h1>
                    <form className={"login-form"} onSubmit={this.submit}>
                        <input className={"login-username"} onChange={this.changeName} name={"name"} type="text" placeholder={"name"} value={this.state.name}/>
                        <input className={"login-password"} onChange={this.changePass} name={"password"} type="password" placeholder={"password"} value={this.state.password}/>
                        <input className={"login-submit"} type="submit" value={"submit"}/>
                    </form>
                    {this.redirect()}
                </div>
            </div>

        );
    }
}

export default Login;