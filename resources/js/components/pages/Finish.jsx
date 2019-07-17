import React, {Component} from 'react';
import StringValues from "../../StringValues";
import {Link} from "react-router-dom";

class Finish extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div></div>
                <section className={"searchSection"}>
                    <form className={"returnContainer"}>
                        <div className={"titleReturn"}>{StringValues.sent}</div>
                        <div className={"descriptionReturn"}>{StringValues.thanks2}</div>
                        <Link className={"linkStyle returnBox"} to={StringValues.Index_path}>
                            <div className="returnLogo fas fa-chevron-left fa-1x"></div>
                            <div className={"returnTitle"}>{StringValues.return}</div>
                        </Link>
                    </form>
                </section>
            </div>
        );
    }
}

export default Finish;