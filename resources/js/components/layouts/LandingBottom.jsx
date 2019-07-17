import React, {Component} from 'react';
import StringValues from "../../StringValues";

class LandingBottom extends Component {
    render() {
        return (
            <div id={"container"}>
                <div id={"title"}>
                    {StringValues.titleAds}
                </div>
                <div id={"content"}>
                    <div id={"ads"}>
                        <div id={"left"}>
                            <div id={"ad0"}>
                                <span className="playBtn fas fa-play fa-2x"></span>
                            </div>
                        </div>
                        <div id={"right"}>
                            <div id={"ad1"}>
                                <span className="playBtn fas fa-play"></span>
                            </div>
                            <div id={"ad2"}>
                                <span className="playBtn fas fa-play"></span>
                            </div>
                            <div id={"ad3"}>
                                <span className="playBtn fas fa-play"></span>
                            </div>
                        </div>
                    </div>
                    <div id={"info"}>
                        <div id={"name"}>{StringValues.nameAds}</div>
                        <div id={"description"}>{StringValues.descriptionAds}</div>
                        <div id={"videoBtn"}>{StringValues.nextVideo}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingBottom;
