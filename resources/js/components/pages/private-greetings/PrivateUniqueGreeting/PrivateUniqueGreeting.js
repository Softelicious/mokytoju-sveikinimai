import React, {Component} from 'react';
import TeacherSearchHeading from "../../CreateMultipleGreetings";
import UniqueGenerator from "../../../layouts/private-greetings/UniqueGenerator/UniqueGenerator";

class PrivateUniqueGreeting extends Component {
    constructor(props){
        super(props);
        this.state = {
            teacherId: 0,
            params: []
        }
    }
    componentWillMount() {
        const { match: { params } } = this.props;
        this.setState({
            teacherId: params.id,
            params: params
        });
    }

    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <div className={"contentContainer"}>
                    <TeacherSearchHeading params={this.state.params}/>
                </div>
                <div className={"CreatePublicGreeting-generate-private"}>
                    <UniqueGenerator/>
                </div>
            </div>
        );
    }
}

export default PrivateUniqueGreeting;
