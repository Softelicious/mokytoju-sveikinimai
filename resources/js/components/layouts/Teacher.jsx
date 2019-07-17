import React, {Component} from 'react';

class Teacher extends Component {
    render() {
        return (
            <div className={"teacher"}>
                <div className="teacherFoto"></div>
                <div className={"teacherName"}>{"Vardas Pavardė"}</div>
                <div className="teacherClose far fa-times-circle fa-1x"></div>
            </div>
        );
    }
}

export default Teacher;