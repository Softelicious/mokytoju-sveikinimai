import React, {Component} from 'react';
import StringValues from "../../StringValues";

class SearchTeachersContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
        }
    }
    trigger = () => {
        this.props.toggle();
        this.props.visible(false);
    };
    onChangeSearch = (e) => {
        if(e.target.value.length>0){
            this.setState({
                search: e.target.value,
            });
            this.props.search(e.target.value);
            this.props.visible(true);
            return;
        }
        this.setState({
            search: '',
        });
        this.props.search('');
        this.props.visible(false);
    };
    render() {

        return (
            <div className={ this.props.show ? "searchTeachersContainer showSearch" : "searchTeachersContainer"} >
                <div className={"searchBoxTeachers"}>
                    <input onChange={this.onChangeSearch} value={this.state.search} type={"text"} className={"searchTeachers"} placeholder={StringValues.searchTeacher}/>
                    <div className={"searchTeachersBtn fas fa-search fa-1x"}> </div>
                </div>
                <div className={"closeTeachers"} onClick={this.trigger}>
                    {StringValues.closeSearchTeacher}
                </div>
            </div>
        );
    }
}

export default SearchTeachersContainer;
