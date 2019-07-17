import React, {Component} from 'react';
import Navigation from './Navigation';
import IndexSearch from './IndexSearch';

class LandingTop extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <Navigation/>
                <IndexSearch/>
                <div></div>
            </div>
        );
    }
}
export default LandingTop;