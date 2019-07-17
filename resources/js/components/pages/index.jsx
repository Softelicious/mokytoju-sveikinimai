import React, {Component} from 'react';
import LandingTop from '../layouts/LandingTop'
import LandingBottom from '../layouts/LandingBottom'
import Footer from '../layouts/Footer'
import FixedCircle from "../layouts/FixedCircle";

class Index extends Component {
    render() {
        return (
            <div>
                <FixedCircle/>
                <LandingTop/>
                <LandingBottom/>
                <Footer/>
            </div>
        );
    }
}
export default Index;