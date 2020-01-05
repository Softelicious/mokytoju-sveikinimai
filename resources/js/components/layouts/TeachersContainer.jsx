import React, {Component} from 'react';
import Teacher from './Teacher';

class TeachersContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteFlag: false,
        }
    }
    trigger = () => {
        this.props.toggle();
    };
    del = (item) => {
        this.props.del(item);
    };
    render() {
        return (
            <div className={"addTeacherContainer"}>
                <div className={"teacherPadding"}>
                    <div className={"teachersBox"}>
                        {this.props.teachersArray.map((item, key) => {
                            return (
                                <Teacher key={key} data={item} del={this.del}/>
                            );
                        })}
                    </div>
                    <div className={"addTeacher fas fa-plus-circle fa-2x"} onClick={this.trigger}> </div>
                    <div className={"teacherSearchIcon fas fa-search fa-2x"}> </div>
                </div>
            </div>
        );
    }
}

export default TeachersContainer;
