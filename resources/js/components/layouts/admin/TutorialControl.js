import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";

class TutorialControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            tutorialFile: {video: '',},
            video: '',
            thumblain: '',
            name: 'name',
            description: 'description'
        };
    }


    load =()=>{
        var cookie = new Cookie();
        axios({
            method: 'get',
            url: '/api/getTutorial',
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        }).then(res =>{
            this.setState({
                tutorialFile: res.data.tutorial[0],
                name: res.data.tutorial[0].name,
                description: res.data.tutorial[0].description,
            });
            console.log(res.data, res.data.tutorial[0])
        }).catch( err =>{
            console.log(err)
        });
    };

    componentWillMount() {
        this.load();
    }
    onChangeVideo = (e) => {
        if (e.target.files ) {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
                this.setState({
                    choose: 'Pamoka pasirinkta'
                });
                this.submitTutorial(ev.target.result);
            });
            reader.readAsDataURL(e.target.files[0]);


        }


    };
    submitTutorial = (blob) => {
        var self = this;
        var cookie = new Cookie();
        const formData = new FormData();
        formData.append(`video`, blob);

        axios({
            method: 'post',
            url: '/api/admin/updateTutorial',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                'Content-Type': `multipart/form-data;`,
            },
            onUploadProgress: progressEvent => {
                var i = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
                if(i!==100){
                    alert("Keliama ")
                }else{
                    alert("Ikelta. Apdorojama...")
                }
            }
            }).then(function (response) {
                self.load();
            })
            .catch(error => {
                console.log(error)
            })

    };

    onChangeThumblain = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener('load', (ev) => {
                this.sendThumblain(ev.target.result);
            });

        }
    };
    sendThumblain = (thumblain) => {
        let self = this;
        var cookie = new Cookie();
        const formData = new FormData();
        formData.append(`thumblain`, thumblain);
        axios({
            method: 'post',
            url: '/api/admin/updateTutorialThumblain',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                "Content-type": "multipart/form-data"
            }
        })
            .then(function (response) {
                self.load();
            })
            .catch(error => {
                console.log(error)
            })
    };
    onChangeName = (e) =>{
        this.setState({
            name: e.target.value,
        });

    };
    onChangeDescription = (e) =>{
        this.setState({
            description: e.target.value,
        });
    };
    onClickNameDescrioption = (e) => {
        e.preventDefault();
        let self = this;
        let cookie = new Cookie();
        const formData = new FormData();
        formData.append(`name`, this.state.name);
        formData.append(`description`, this.state.description);
        axios({
            method: 'post',
            url: '/api/admin/updateTutorialDescriptionAndName',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            },
            onUploadProgress: progressEvent => {
                var i = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
                if(i!==100){
                    alert("Keliama ".i)
                }else{
                    alert("Ikelta. Apdorojama...")
                }
            }
            }).then(function (response) {
                self.load();
            })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div className={"tutorial-upload-title"}>Vaizdo pamoka</div>
                <div className="video-controll-toggle" >
                    <div className="video-controll-top">
                        <form className={"change-video-form"}>
                            <div className="video-controll-video">
                                <video src={this.state.tutorialFile.video} controls>
                                    <source src={this.state.tutorialFile.video} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>
                                    <p>Sorry, but your browser does not support this video format.</p>
                                </video>
                                <input onChange={this.onChangeVideo} accept="video/mp4,video/x-m4v,video/*" style={{display: 'none'}} type="file"  name="video" id="videoChanget"/>
                                <label className="video-controll-change" htmlFor="videoChanget">Pakeisti</label>
                            </div>
                        </form>
                        <form  className={"change-thumblain-form"}  encType={"multipart/form-data"}>
                            <div className="video-controll-thumblain" style={{backgroundImage: `url(${this.state.tutorialFile.thumblain})`}}>
                                <input onChange={this.onChangeThumblain} style={{display: 'none'}} accept="image/*" type="file"  name="thumblain" id="thumblainChanget"/>
                                <label className="video-controll-change" htmlFor="thumblainChanget">Pakeisti</label>
                            </div>
                        </form>
                    </div>
                    <form onSubmit={this.onClickNameDescrioption} className={"change-desscription-form"}>
                        <div className="video-controll-descriptionContainer">
                            <input type={"text"} onChange={this.onChangeName} value={this.state.name} className="video-controll-name"/>
                            <textarea onChange={this.onChangeDescription} value={this.state.description} className="video-controll-description"/>
                        </div>
                        <input  type={"submit"} value={"Pakeisti"} className="video-controll-submit"/>
                    </form>

                </div>
            </div>
        );
    }
}

export default TutorialControl;