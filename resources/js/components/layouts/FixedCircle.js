import React, {Component} from 'react';
import {Link} from "react-scroll";

class FixedCircle extends Component {
    render() {
        return (
            <Link smooth={true} to={"bookshelfContainer"}>
                <div id={"circle"} >
                    <div id={"circle-icon"}  className="fas fa-angle-up fa-2x">

                    </div>
                </div>
            </Link>

        );
    }
}

export default FixedCircle;