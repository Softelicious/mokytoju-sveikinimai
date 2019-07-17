import React, {Component} from 'react';
import StringValues from "../../StringValues";

class CardButtonsUnique extends Component {
    render() {
        return (
            <div className={"createBottom"}>
                <ul className={"leftButtons"}>
                    <li className="fas fa-arrow-left fa-2x"></li>
                    <li>{StringValues.cardStyle}</li>
                    <li className="fas fa-arrow-right fa-2x"></li>
                </ul>
                <ul className={"middleButtons"}>
                    <li>{StringValues.upload}</li>
                </ul>
                <ul className={"rightButtons"}>
                    <li>{StringValues.send}</li>
                </ul>
            </div>
        );
    }
}

export default CardButtonsUnique;