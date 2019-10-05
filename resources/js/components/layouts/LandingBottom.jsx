import React, {Component} from 'react';
import StringValues from "../../StringValues";
import axios from 'axios';
import HyperModal from 'react-hyper-modal';

class LandingBottom extends Component {
    constructor(props){
        super(props);
        this.state = {
            one: '',
            two: '',
            three: '',
            four: '',
            seq: 1,
            isModalOpen1: false,
            isModalOpen2: false,
            isModalOpen3: false,
            isModalOpen4: false,
        }
    }
    componentWillMount() {
       this.load();
    }

    load = () => {
        let self = this;
        axios({
            method: 'get',
            url: '/api/getVideos'
        })
            .then(function (response) {
                self.setState({
                    one: response.data[0],
                    two: response.data[1],
                    three: response.data[2],
                    four: response.data[3],
                });
            })
            .catch(error => {
                console.log(error)
            })
    };
    addSeq = () =>{
        if(this.state.seq <4){
            this.setState({
                seq: this.state.seq+1
            })
        }else{
            this.setState({
                seq: 1
            })
        }

    };
    renderVideoInfo = () => {
        switch (this.state.seq) {
            case 1:
                return (
                    <>
                        <div id={"name"}>{this.state.one.name}</div>
                        <div id={"description"}>{this.state.one.description}</div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div id={"name"}>{this.state.two.name}</div>
                        <div id={"description"}>{this.state.two.description}</div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div id={"name"}>{this.state.three.name}</div>
                        <div id={"description"}>{this.state.three.description}</div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div id={"name"}>{this.state.four.name}</div>
                        <div id={"description"}>{this.state.four.description}</div>
                    </>
                );
        }
    };
    openModal1 = () => this.setState({ isModalOpen1: true });
    closeModal1 = () => this.setState({ isModalOpen1: false });

    openModal2 = () => this.setState({ isModalOpen2: true });
    closeModal2 = () => this.setState({ isModalOpen2: false });

    openModal3 = () => this.setState({ isModalOpen3: true });
    closeModal3 = () => this.setState({ isModalOpen3: false });

    openModal4 = () => this.setState({ isModalOpen4: true });
    closeModal4 = () => this.setState({ isModalOpen4: false });
    render() {
        const { isModalOpen1, isModalOpen2, isModalOpen3, isModalOpen4 } = this.state;
        return (
            <div id={"container"}>
                <div id={"title"}>
                    {StringValues.titleAds}
                </div>
                <div id={"content"}>
                    <div id={"ads"}>
                        <div id={"left"}>

                            <div id={"ad0"} style={{boxShadow : this.state.seq === 1 ? '0px 0px 53px -9px rgba(0,0,0,0.85)': '',backgroundImage: `url(${this.state.one.thumblain})`}}>
                                <HyperModal
                                    renderOpenButton={(openMod) => {
                                        return (
                                            <span onClick={this.openModal1} className={"biggerBtn playBtn fas fa-play "}></span>
                                        )}}

                                    isOpen={isModalOpen1}
                                    requestClose={this.closeModal1}

                                >
                                    <video width={'660px'} height={'390px'} className="video-player"  src={this.state.one.video} controls >
                                        <p>Sorry, but your browser does not support this video format.</p>
                                    </video>
                                </HyperModal>
                            </div>

                        </div>
                        <div id={"right"}>
                            <div className={"rightWrap"} id={"ad1"} style={{ boxShadow : this.state.seq === 2 ? '0px 0px 53px -9px rgba(0,0,0,0.85)': '',backgroundImage: `url(${this.state.two.thumblain})`}}>
                                <HyperModal
                                    renderOpenButton={(openMod) => {
                                        return (
                                            <span onClick={this.openModal2} className="playBtn fas fa-play"></span>
                                        )}}

                                    isOpen={isModalOpen2}
                                    requestClose={this.closeModal2}

                                >
                                    <video width={'660px'} height={'390px'} className="video-player"  src={this.state.two.video} controls >
                                        {/*<source src={vid} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>*/}
                                        <p>Sorry, but your browser does not support this video format.</p>
                                    </video>
                                </HyperModal>
                            </div>
                            <div className={"rightWrap"} id={"ad2"} style={{boxShadow : this.state.seq === 3 ? '0px 0px 53px -9px rgba(0,0,0,0.85)': '',backgroundImage: `url(${this.state.three.thumblain})`}}>
                                <HyperModal
                                    renderOpenButton={(openMod) => {
                                        return (
                                            <span onClick={this.openModal3} className="playBtn fas fa-play"></span>
                                        )}}

                                    isOpen={isModalOpen3}
                                    requestClose={this.closeModal3}

                                >
                                    <video width={'660px'} height={'390px'} className="video-player"  src={this.state.three.video} controls >
                                        {/*<source src={vid} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>*/}
                                        <p>Sorry, but your browser does not support this video format.</p>
                                    </video>
                                </HyperModal>
                            </div>
                            <div className={"rightWrap"} id={"ad3"} style={{boxShadow : this.state.seq === 4 ? '0px 0px 53px -9px rgba(0,0,0,0.85)': '',backgroundImage: `url(${this.state.four.thumblain})`}}>
                                <HyperModal
                                    renderOpenButton={(openMod) => {
                                        return (
                                            <span onClick={this.openModal4} className="playBtn fas fa-play"></span>
                                        )}}

                                    isOpen={isModalOpen4}
                                    requestClose={this.closeModal4}

                                >
                                    <video width={'660px'} height={'390px'}  className="video-player"  src={this.state.four.video} controls >
                                        {/*<source src={vid} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>*/}
                                        <p>Sorry, but your browser does not support this video format.</p>
                                    </video>
                                </HyperModal>
                            </div>
                        </div>
                    </div>
                    <div id={"info"}>
                        {this.renderVideoInfo()}
                        <div onClick={this.addSeq} id={"videoBtn"}>{StringValues.nextVideo}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingBottom;
