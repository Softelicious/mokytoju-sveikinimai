import React, {Component} from 'react';

class GreyBackgroundLoad extends Component {
    render() {
        return (
            <div className={"greyBackgroundLoad"} style={{display: this.props.display}}>
                <div className={"greyContainer"}>keliama</div>
            </div>
        );
    }
}

export default GreyBackgroundLoad;