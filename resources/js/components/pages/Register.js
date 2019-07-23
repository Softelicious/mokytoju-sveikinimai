import React, {Component} from 'react';
import StringValues from "../../StringValues";
import axios from "axios";

class Register extends Component {
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
            url: '/api/register',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                console.log(response.data)
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
                <h1>Register</h1>
                <form onSubmit={this.submit}>
                    <input onChange={this.changeName} name={"name"} type="text" placeholder={"name"} value={this.state.name}/>
                    <input onChange={this.changePass} name={"password"} type="password" placeholder={"password"} value={this.state.password}/>
                    <input type="submit" value={"submit"}/>
                </form>

            </div>
        );
    }
}

export default Register;