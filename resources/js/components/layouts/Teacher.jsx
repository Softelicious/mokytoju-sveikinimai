import React, {Component} from 'react';

class Teacher extends Component {
    constructor(props){
        super(props)
    }
    del = () => {
        this.props.del(this.props.data);
    };
    render() {
        return (
            <div className={"teacher"}>
                {/*<div className="teacherFoto"></div>*/}
                <div className={"teacherName"}>{this.props.data.name}</div>
                <div className="teacherClose far fa-times-circle fa-1x" onClick={this.del}> </div>
            </div>
        );
    }
}

export default Teacher;
