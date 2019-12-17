import React, {Component} from 'react';
import TeacherSearchHeading from "../../CreateMultipleGreetings";
import PublicGreetingCreate from "../../../layouts/PublicGreetingCreate";
import CreatePublicGreeting from "../../CreatePublicGreeting";
import UsualGenerator from "../../../layouts/private-greetings/UsuallGenerator/UsuallGenerator";

class PrivateGeneratedGreeting extends Component {
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
                    <UsualGenerator/>
                </div>
            </div>
        );
    }
}

export default PrivateGeneratedGreeting;
