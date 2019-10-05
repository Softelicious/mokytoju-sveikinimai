import React, {Component} from 'react';
import PublicGreetingCreate from '../layouts/PublicGreetingCreate';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'
import Cookie from 'universal-cookie'
import UniquePublicGreetingCreate from "../layouts/UniquePublicGreetingCreate";

class CreatePublicGreeting extends Component {
    constructor(props){
        super(props);
        this.state = {
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

    publicGreetingInit = () => {
        try {
            return (<PublicGreetingCreate
                verified={localStorage.getItem('verified')}
                picture={localStorage.getItem('picture')}
                student={localStorage.getItem('student')}
                card_index={this.props.location.state.card_index}
                teacher={this.props.location.state.teacher}
                school={this.props.location.state.school}
            />)
        }catch (e) {
            return (<PublicGreetingCreate
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
                content: (<div className={"bookshelfContainer"}>
                    <div></div>
                    <div id="try">
                        {this.publicGreetingInit()}
                    </div>
                </div>)
            })
        }else{
            this.setState({
                content: (
                    <div className={"bookshelfContainer"}>
                        <div></div>
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
                    </div>
                        )
            })
        }
    };
    componentWillMount() {
       this.load()
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

export default CreatePublicGreeting;