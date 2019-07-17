import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import StringValues from "../../StringValues";
import Cards from "../../Cards";
import axios from "axios";


class PublicGreetingCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            styleChars: 11,
            teacher: '',
            student: '',
            card: 0
        }
    }

    changeWidth  = (e) => {
        const $lenth = e.target.value.length;

        this.setState({
            styleChars: $lenth,
            student: e.target.value
        })
        console.log(this.state.styleChars);
    };
    onChangeTeacher = (e) => {
        this.setState({
            teacher: e.target.value
        })
    };
    submit = (e) => {
        e.preventDefault();
        console.log(2);
        this.setState({
            styleChars: 11,
            teacher: '',
            student: ''
        });
        var bodyFormData = new FormData;
        bodyFormData.append('student', this.state.student);
        bodyFormData.append('teacher', this.state.teacher);
        bodyFormData.append('greeting', 1);
        bodyFormData.append('card', this.state.card);
        axios({
            method: 'post',
            url: '/api/store',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                alert("Patalpinta")
            })
            .catch(function (response) {
                alert("Nepavyko")
            });

    };
    leftArrow = () => {
        console.log(55);
        if(this.state.card!==0){
            this.setState({

                card: this.state.card-1
            })
        }else{
            this.setState({

                card: 14
            })
        }

    };
    rightArrow = () => {
        console.log(44);
        if(this.state.card!==14){
            this.setState({

                card: this.state.card+1
            })
        }else{
            this.setState({

                card: 0
            })
        }


    };
    render() {
        return (
            <form  onSubmit={this.submit}>
                <div className={"contentContainer"}>
                    <div className={"newGreetingContent"}>
                        <div className={"createTop"}>
                            {StringValues.publicTitle}
                        </div>
                        <div className={"createSecond"}>
                            <div className={"card"} style={{backgroundImage:  `url(${Cards.data[this.state.card].url})`}}>

                            </div>
                            <div className={"cardInfo"}>
                                <div className={"infoTop"}>
                                    <h3>{StringValues.adress }
                                        <input onChange={this.onChangeTeacher} required type="text" id={"teacher-name"} name={"teacher-name"}
                                               placeholder={"Įveskite vardą"} value={this.state.teacher}/>
                                    </h3>
                                    <p>{StringValues.greeting}</p>
                                </div>
                                <div className={"infoMiddle"}></div>
                                <div className={"infoBottom"}>
                                    <div>{StringValues.adress2}</div>
                                    <div>{StringValues.thanks}</div>
                                    <div>{StringValues.adress3}
                                        <input required onChange={this.changeWidth} type="text"
                                               style={{ width: this.state.styleChars*9+7+"px"}} id={"student-name"}
                                               name={"student-name"} placeholder={"Įveskite vardą"} value={this.state.student}/>
                                    </div>
                                </div>
                                <Link to={StringValues.CreateUniquePublicGreetings_path}>
                                    <div id={"btn-unique-greeting"}>Unikalus sveikinimas</div>
                                </Link>
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

        );
    }
}

export default PublicGreetingCreate;