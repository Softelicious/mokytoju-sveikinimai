import React, {Component} from 'react';
import PublicGreetingCreate from "../../PublicGreetingCreate";
import FacebookLogin from "react-facebook-login";
import Card from "./Card/Card";

class UsuallGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
    }

    componentClicked = () => console.log('clicked');
    responseFacebook = (response) => {
        if(response.picture.data.url){
            localStorage.setItem('isVerified', 'true');
            localStorage.setItem('student', response.name);
            localStorage.setItem('picture', response.picture.data.url);
        }else{
            localStorage.setItem('isVerified', 'false');
        }
        this.load()
    };

    publicGreetingInit = () => {
        try {
            return (<Card
                verified={localStorage.getItem('isVerified')}
                picture={localStorage.getItem('picture')}
                student={localStorage.getItem('student')}
                card_index={this.props.location.state.card_index}
                teacher={this.props.location.state.teacher}
                school={this.props.location.state.school}
            />)
        }catch (e) {
            return (<Card
                verified={localStorage.getItem('isVerified')}
                picture={localStorage.getItem('picture')}
                student={localStorage.getItem('student')}
                card_index={0}
                teacher={''}
                school={''}
            />)
        }
    };
    load = () => {
        if(JSON.parse(localStorage.getItem('isVerified'))){
            this.setState({
                content: (
                    <div className={"bookshelfContainer"}>
                        <div></div>
                        <div id="try">
                            {this.publicGreetingInit()}
                        </div>
                    </div>
                )
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

export default UsuallGenerator;
