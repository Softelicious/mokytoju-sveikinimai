import React, {Component} from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: ''
        }
    }
    submit = (e) => {
        e.preventDefault();
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
                var cookies = new Cookies();
                cookies.set('access_token', response.data.access_token, { path: '/' });
            })
            .catch(function (response) {
                alert("Nepavyko")
            });

        this.setState({
            name: '',
            password: ''
        });

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
                <h1>Login</h1>
                <form onSubmit={this.submit}>
                    <input onChange={this.changeName} name={"name"} type="text" placeholder={"name"} value={this.state.name}/>
                    <input onChange={this.changePass} name={"password"} type="password" placeholder={"password"} value={this.state.password}/>
                    <input type="submit" value={"submit"}/>
                </form>

            </div>
        );
    }
}

export default Login;