import React, {Component} from 'react';
import File from "./File";
import StringValues from "../../StringValues";

class CardsUnique extends Component {
    render() {
        return (
            <div className={"createSecond"}>
                <div className={"card_index"}>

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
                    <div className={"infoFiles"}>
                        <div className={"titleInfoFiles"}>Prisegta:</div>
                        <div className={"contentInfoFiles"}>
                            <File/>
                            <File/>
                            <File/>
                            <File/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardsUnique;