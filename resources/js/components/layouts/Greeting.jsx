import React, {Component} from 'react';
import StringValues from '../../StringValues';
import foto2 from '../../../../public/assets/placeholders/14.jpg';


class Greeting extends Component {
    render() {
        return (
            <div className={"greeting"}>
                <div className={"content"}>
                    <div className={"leftContent"}>
                        <img src={foto2}/>
                    </div>
                    <div className={"middleContent"}>
                        <div className={"fullName"}>
                            Vardas Pavardė
                        </div>
                        <div className={"school"}>
                            Mokykla
                        </div>
                    </div>
                    <div className={"rightContent"}>
                        <div className="playGreeting fas fa-chevron-right fa-1x"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Greeting;