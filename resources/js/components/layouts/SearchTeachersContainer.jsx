import React, {Component} from 'react';
import StringValues from "../../StringValues";

class SearchTeachersContainer extends Component {
    render() {
        return (
            <div className={"searchTeachersContainer"} >
                <div className={"searchBoxTeachers"}>
                    <input type={"text"} className={"searchTeachers"} placeholder={StringValues.searchTeacher}/>
                    <div className={"searchTeachersBtn fas fa-search fa-1x"}></div>
                </div>
                <div className={"closeTeachers"}>
                    {StringValues.closeSearchTeacher}
                </div>
            </div>
        );
    }
}

export default SearchTeachersContainer;