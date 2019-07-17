import React, {Component} from 'react';
import StringValues from "../../StringValues";

class CardNormal extends Component {
    render() {
        return (
            <div className={"createSecond"}>
                <div className={"card"}>
                </div>
                <div className={"cardInfo"}>
                    <div className={"infoTop"}>
                        <h3>{StringValues.adress + " Vardeni Pavardeni,"}</h3>
                        <p>{StringValues.greeting}</p>
                    </div>
                    <div className={"infoMiddle"}></div>
                    <div className={"infoBottom"}>
                        <div>{StringValues.adress2 + " Vardeni Pavardeni,"}</div>
                        <div>{StringValues.thanks}</div>
                        <div>{StringValues.adress3+ " Lukas Lukauskas."}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardNormal;