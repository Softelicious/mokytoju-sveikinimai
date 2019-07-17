import React, {Component} from 'react';
import Navigation from "../layouts/Navigation";
import Footer from "../layouts/Footer";
import GreetingsSection from "../layouts/GreetingsSection";

class PublicGreetings extends Component {
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <Navigation/>
                <GreetingsSection/>
                <Footer/>
            </div>
        );
    }
}

export default PublicGreetings;