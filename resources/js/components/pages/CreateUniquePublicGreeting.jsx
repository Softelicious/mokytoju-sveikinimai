import React, {Component} from 'react';
import PublicGreetingCreate from "../layouts/PublicGreetingCreate";
import UniquePublicGreetingCreate from "../layouts/UniquePublicGreetingCreate";
import Cookie from 'universal-cookie'

import {NotificationContainer} from "react-notifications";
import FacebookLogin from "react-facebook-login";


class CreateUniquePublicGreeting extends Component {
    constructor(props){
        super(props);
        this.state={
            content: ''
        }
    }
    componentClicked = () => console.log('clicked');
    responseFacebook = (response) => {
        localStorage.setItem('verified', "true");
        localStorage.setItem('student', response.name);
        localStorage.setItem('picture', response.picture.data.url);
        this.load()
    };
    uniquePublicGreetingInit = () => {
        try{
            return (<UniquePublicGreetingCreate
                verified={localStorage.getItem('verified')}
                picture={localStorage.getItem('picture')}
                student={localStorage.getItem('student')}
                card_index={this.props.location.state.card_index}
                teacher={this.props.location.state.teacher}
                school={this.props.location.state.school}
            />)
        }catch (e){
            return (<UniquePublicGreetingCreate
                verified={localStorage.getItem('verified')}
                picture={localStorage.getItem('picture')}
                student={localStorage.getItem('student')}
                card_index={0}
                teacher={''}
                school={''}
            />)
        }
    };
    load = () => {
        if(JSON.parse(localStorage.getItem('verified'))){
            this.setState({
                content: (
                    <div id="try">
                        {this.uniquePublicGreetingInit()}
                    </div>
                )
            })
        }else{
            this.setState({
                content: (
                    <div>
                        <div className="fb-container">
                            <FacebookLogin
                                icon="fa-facebook fa-2x"
                                textButton={"   Turite prisijungti prie facebook"}
                                cssClass={"fb"}
                                appId="519677678844098"
                                autoLoad={false}
                                fields="name,picture.type(large)"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                version="3.1"/>
                        </div>
                    </div>
                )
            })
        }
    };
    componentWillMount() {
        this.load();
    }

    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                {this.state.content}
            </div>
        );
    }
}

export default CreateUniquePublicGreeting;