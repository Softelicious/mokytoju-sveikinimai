import React, {Component} from 'react';
import Teacher from './Teacher';

class TeachersContainer extends Component {
    constructor(props){
        super(props);
    }
    trigger = () => {
        this.props.set();
    }
    render() {
        return (
            <div className={"addTeacherContainer"}>
                <div className={"teacherPadding"}>
                    <div className={"teachersBox"}>
                        <Teacher/>
                        <Teacher/>
                        <Teacher/>
                    </div>
                    <div className={"addTeacher fas fa-plus-circle fa-2x"}></div>
                    <div className={"teacherSearchIcon fas fa-search fa-2x"}></div>
                </div>
            </div>
        );
    }
}

export default TeachersContainer;