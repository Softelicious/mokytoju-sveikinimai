import React, {Component} from 'react';
import TeachersContainer from "../layouts/TeachersContainer";
import StringValues from "../../StringValues";
import CardNormal from "../layouts/CardNormal";
import SearchTeachersContainer from "../layouts/SearchTeachersContainer";
import CardButtonsNormal from "../layouts/CardButtonsNormal";
import GreyBackground from "../layouts/GreyBackground";

class CreateMultipleGreetings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: true
        };
    }
    set = () => {
        this.setState({
            isOn: true
        })
    }
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <div className={"contentContainer"}>
                    <div className={"newGreetingContent"}>
                        <TeachersContainer/>
                        <SearchTeachersContainer />
                        <GreyBackground/>
                        <div className={"createTop2"}>
                            {"Sveikinimas siunčiamas 3 mokytojams"}
                        </div>
                        <CardNormal/>
                        <div className={"createThird"}>
                            {StringValues.messageDelivery}
                        </div>
                        <CardButtonsNormal/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMultipleGreetings;