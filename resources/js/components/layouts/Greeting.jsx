import React, {Component} from 'react';
import StringValues from '../../StringValues';
import foto2 from '../../../../public/assets/placeholders/tch.png';


class Greeting extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={"greeting"}>
                <div className={"content"}>
                    <div className={"leftContent"}>
                        <img src={this.props.data.picture}/>
                    </div>
                    <div className={"middleContent"}>
                        <div className={"fullName"}>
                            {this.props.data.teacher}
                        </div>
                        <div className={"school"}>
                            {this.props.data.school}
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