import React, {Component} from 'react';
import StringValues from "../../StringValues";
import {Link} from "react-router-dom";

class CardNormal extends Component {
    render() {
        return (
            <div className={"contentContainer openedGreeting"} >
                <div className={"newGreetingContent"} >
                    <div className={"createSecond"}>
                        <div className={"card"} style={{backgroundImage:  `url(${this.props.card})`}}>
                            <div className={"card-fb"}>
                                <img className={"card-fb-img"} src={this.props.picture} alt=""/>
                            </div>
                        </div>
                        <div className={"cardInfo"}>
                            <div className={"infoTop"}>
                                <h3>{StringValues.adress + this.props.teacher}
                                </h3>
                                <p>{this.props.greeting}</p>
                            </div>
                            <div className={"infoMiddle"}></div>
                            <div className={"infoBottom"}>
                                <div>{StringValues.adress2}</div>
                                <div>{StringValues.thanks}</div>
                                <div className={"adress-student"}>
                                    <div id={"adress3"}>
                                        {StringValues.adress3}
                                    </div>
                                    <div> {this.props.student} </div>
                                </div>
                                {/*<div> {this.props.school} </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardNormal;