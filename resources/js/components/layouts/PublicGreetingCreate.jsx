import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import StringValues from "../../StringValues";
import Cards from "../../Cards";
import axios from "axios";
import ReCAPTCHA from "react-recaptcha";
import GreyBackground from "./GreyBackground";
import GreyBackgroundLoad from "./GreyBackgroundLoad";

class PublicGreetingCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            styleChars: 11,
            teacher: '',
            student: '',
            school: '',
            card_index: 0,
            cards: [],
            load: false,
            max:0,
            greetings: [],
            gmax: 0,
            rand: 0,
            redirect: false,
            captcha: '',
            verified:'',
            picture: '',
            display: 'none'

        }
    }

    load = () => {
        axios({
            method: 'get',
            url: '/api/getCards',
        }).then(res =>{
            this.setState({
                cards: res.data.names,
                load: true,
                max: res.data.sk-1,

            });
            console.log(res.data.names)
        }).catch( err =>{
            console.log(err)
        });

        axios({
            method: 'get',
            url: '/api/getGreetings',
        }).then(res =>{
            this.setState({
                greetings: res.data.names,
                gmax: res.data.sk,

            });
            this.setState({
                rand: Math.floor(Math.random() * this.state.gmax)
            });
            console.log(res.data.names)
        }).catch( err =>{
            console.log(err)
        });
    };
    componentWillMount() {
        this.load();
        this.setState( {
                verified: this.props.verified,
                picture: this.props.picture,
                student: this.props.student,
                styleChars: this.props.student.length,
        });

        if(this.props.card_index !== undefined){
            this.setState( {
                card_index: this.props.card_index,
                teacher: this.props.teacher,
                school: this.props.school,
            });
        }


    }

    changeWidth  = (e) => {
        const $lenth = e.target.value.length;

        this.setState({
            styleChars: $lenth,
            student: e.target.value
        });
        console.log(this.state.styleChars);
    };
    onChangeTeacher = (e) => {
        this.setState({
            teacher: e.target.value
        })
    };
    submit = (e) => {
        e.preventDefault();
        self = this;
        this.setState({
            styleChars: 11,
            teacher: '',
            student: '',
            school: '',
            display: 'block'
        });
        var bodyFormData = new FormData;
        bodyFormData.append('student', this.state.student);
        bodyFormData.append('teacher', this.state.teacher);
        bodyFormData.append('greeting', this.state.greetings[this.state.rand]);
        bodyFormData.append('card', this.state.cards[this.state.card_index]);
        bodyFormData.append('school', this.state.school);
        bodyFormData.append('captcha', this.state.captcha);
        bodyFormData.append('picture', this.state.picture);
        axios({
            method: 'post',
            url: '/api/store',
            data: bodyFormData,
        })
            .then(function (response) {
                if(response.data.success){
                    self.setState({
                        redirect: true
                    });
                }else{
                    alert("Recaptcha sako, kad robotas");
                    self.changeDisplay('none')
                }
            })
            .catch(function (response) {
                alert("Nepavyko");
                console.log(response);
                self.changeDisplay('none')
            });

    };
    leftArrow = () => {
        console.log(55);
        if(this.state.card_index!==0){
            this.setState({

                card_index: this.state.card_index-1
            })
        }else{
            this.setState({

                card_index: this.state.max
            })
        }

    };
    rightArrow = () => {
        console.log(44);
        if(this.state.card_index!==this.state.max){
            this.setState({

                card_index: this.state.card_index+1
            })
        }else{
            this.setState({

                card_index: 0
            })
        }


    };
    onChangeSchool = (e) => {
        console.log(44);
        this.setState({
            school: e.target.value
        })
    };
    redirect = () => {
        if(this.state.redirect){
            const to = {
                pathname: StringValues.Greetings_path,
            };
            return (<Redirect to={to}/>);
        }
    };

    verifyCallback = (value) => {
        this.setState({
            captcha: value
        })
    };

    changeDisplay = (value) => {
        this.setState({
            display: value
        })
    };



    render() {
        let style;
        if(this.state.styleChars> 11){
            style = {width: this.state.styleChars*9+"px"}
        }
            return (
                <>
                    <GreyBackgroundLoad display={this.state.display}/>
                    <form  onSubmit={this.submit}>
                        <div className={"contentContainer"}>
                            <div className={"newGreetingContent"}>
                                <div className={"createTop"}>
                                    {StringValues.publicTitle}
                                </div>
                                <div className={"createSecond"}>
                                    <div className={"card"} style={{backgroundImage:  `url(${this.state.cards[ this.state.card_index ]})`}}>
                                        <div className={"card-fb"}>
                                            <img className={"card-fb-img"} src={this.state.picture} alt=""/>
                                        </div>
                                    </div>
                                    <div className={"cardInfo"}>
                                        <div className={"infoTop"}>
                                            <h3>{StringValues.adress }
                                                <input onChange={this.onChangeTeacher} required type="text" id={"teacher-name"} name={"teacher-name"}
                                                       placeholder={"Įveskite vardą"} value={this.state.teacher}/>
                                            </h3>
                                            <p>{this.state.greetings[this.state.rand]}</p>
                                        </div>
                                        <div className={"infoMiddle"}></div>
                                        <div className={"infoBottom"}>
                                            <div>{StringValues.adress2}</div>
                                            <div>{StringValues.thanks}</div>
                                            <div className={"adress-student"}>
                                                <div id={"adress3"}>
                                                    {StringValues.adress3}
                                                </div>
                                                <div>
                                                    <input required onChange={this.changeWidth} type="text"
                                                           style={style} id={"student-name"}
                                                           name={"student-name"} placeholder={"Įveskite vardą"} value={this.state.student}/>
                                                </div>
                                            </div>
                                            <div>
                                                <input required onChange={this.onChangeSchool} type="text" id={"teacher-school"}
                                                       name={"student-name"} placeholder={"Įveskite mokytojo mokyklą"} value={this.state.school}/>
                                            </div>
                                        </div>
                                        <Link
                                            to={{
                                                  pathname: StringValues.CreateUniquePublicGreetings_path,
                                                  state: {
                                                      verified: this.props.verified,
                                                      picture: this.props.picture,
                                                      student: this.props.student,
                                                      card_index: this.state.card_index,
                                                      teacher: this.state.teacher,
                                                      school: this.state.school
                                                  }
                                                }}
                                        >
                                            <div id={"btn-unique-greeting"}>Unikalus sveikinimas</div>
                                        </Link>
                                        <div className={"recaptcha"}>
                                            <ReCAPTCHA
                                                sitekey="6Lf2ibMUAAAAAMUMmwHWcwyTgk5FJjZjCfbDajsh"
                                                render="explicit"
                                                verifyCallback={this.verifyCallback}
                                            />
                                        </div>



                                    </div>
                                </div>
                                <div className={"createThird"}>
                                    {StringValues.messageDelivery}
                                </div>
                                <div className={"createBottom"}>
                                    <ul className={"leftButtons"}>
                                        <li onClick={this.leftArrow} className="changeStyleBtnArrow fas fa-arrow-left fa-1x"></li>
                                        <li>{StringValues.cardStyle}</li>
                                        <li onClick={this.rightArrow} className="changeStyleBtnArrow fas fa-arrow-right fa-1x"></li>
                                    </ul>
                                    <ul className={"rightButtons"}>
                                        <input type={"submit"} value={StringValues.send}/>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.redirect()}
                </>
            )


    }
}

export default PublicGreetingCreate;
