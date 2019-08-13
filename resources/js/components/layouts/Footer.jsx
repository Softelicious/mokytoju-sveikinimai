import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';


class Footer extends Component {
    render() {
        return (
            <footer className={"footer"}>
                <div className={"footerTable"}>
                    <div>
                        <div>
                           <i className="btn fab fa-facebook-square fa-2x"></i>
                        </div>
                        <div>
                            <i className="btn fab fa-youtube fa-2x"></i>
                        </div>
                        <div>
                            <i className="btn fas fa-envelope fa-2x"></i>
                        </div>
                    </div>
                    <div className={"footer-middle"}>
                        <Link className={"linkStyle"}  to={StringValues.Video_path}>
                            <div>{StringValues.buttonAbout}</div>
                        </Link>
                        <div className={"line footer-line"}></div>
                        <Link className={"linkStyle"} to={StringValues.Video_path}>
                            <div>{StringValues.buttonInfo}</div>
                        </Link>
                    </div>
                    <div>
                        {StringValues.titleSearch}
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;