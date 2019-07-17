import React, {Component} from 'react';
import StringValues from '../../StringValues';
import Ads from './Ads'

class AdsSection extends Component {
    render() {
        return (
            <section className={"landingSection"}>
                <div className={"titleAd"}>{StringValues.titleAds}</div>
                <Ads/>
            </section>
        );
    }
}

export default AdsSection;