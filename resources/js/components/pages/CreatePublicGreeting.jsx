import React, {Component} from 'react';
import PublicGreetingCreate from '../layouts/PublicGreetingCreate';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

class CreatePublicGreeting extends Component {
    constructor(props){
        super(props);
        this.state = {
            veryfied: false,
            name: '',
            picture: '',
            content: ''
        }
    }

    componentClicked = () => console.log('clicked');
    responseFacebook = (response) => {
        this.setState({
            name: response.name,
            picture: response.picture.data.url
        });
        this.load()
    };
    load = () => {
        if(this.state.veryfied){
            this.setState({
                content: (<div className={"bookshelfContainer"}>
                    <div></div>
                    <div id="try">
                        <PublicGreetingCreate/>
                    </div>
                </div>)
            })
        }else{
            this.setState({
                content: (
                    <div className={"bookshelfContainer"}>
                        <div></div>
                        <FacebookLogin
                            appId="519677678844098"
                            autoLoad={true}
                            fields="name,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            version="3.1"/>
                    </div>
                        )
            })
        }
    };
    componentWillMount() {
        //this.load();
    }

    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <FacebookLogin
                    appId="519677678844098"
                    autoLoad={true}
                    fields="name,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    version="3.1"/>
            </div>
        );
    }
}

export default CreatePublicGreeting;