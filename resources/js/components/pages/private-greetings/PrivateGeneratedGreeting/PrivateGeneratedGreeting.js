import React, {Component} from 'react';
import TeacherSearchHeading from "../../TeacherSearchHeading";
import UsualGenerator from "../../../layouts/private-greetings/UsuallGenerator/UsuallGenerator";
import TeacherContextProvider from "../../../../contexts/TeacherContext";

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
                <TeacherContextProvider>
                    <div></div>
                    <div className={"contentContainer"}>
                        <TeacherSearchHeading params={this.state.params}/>
                    </div>
                    <div className={"CreatePublicGreeting-generate-private"}>
                        <UsualGenerator/>
                    </div>
                </TeacherContextProvider>
            </div>
        );
    }
}

export default PrivateGeneratedGreeting;
