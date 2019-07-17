import React, {Component} from 'react';
import TeachersContainer from "../layouts/TeachersContainer";
import SearchTeachersContainer from "../layouts/SearchTeachersContainer";
import CardUnique from "../layouts/CardsUnique";
import CardButtonsUnique from "../layouts/CardButtonsUnique";
import GreyBackground from "../layouts/GreyBackground";
import StringValues from "../../StringValues";

class CreateUniqueGreetings extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <div className={"contentContainer"}>
                    <div className={"newGreetingContent"}>
                        <TeachersContainer/>
                        <SearchTeachersContainer/>
                        <GreyBackground/>
                        <div className={"createTop2"}>
                            {"Sveikinimas siunčiamas 3 mokytojams"}
                        </div>
                        <CardUnique/>
                        <div className={"createThird"}>
                            {StringValues.messageDelivery}
                        </div>
                        <CardButtonsUnique/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUniqueGreetings;