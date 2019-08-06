import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";


class TutorialControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            tutorial: '',
            tutorialFile: ''
        };
    }

    changeTutorial = (e) => {
        if (e.target.files ) {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
                this.setState({
                    tutorial: ev.target.result
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        }


    };
    submitTutorial = (e) => {
        e.preventDefault();
        //console.log(this.state.tutorial)
        var self = this;
        var cookie = new Cookie();
        const formData = new FormData();
        formData.append(`tutorial`, this.state.tutorial);
        const config = {
            onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        }
        axios({
            method: 'post',
            url: '/api/admin/uploadTutorial',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                'Content-Type': `multipart/form-data;`,
            },
            onUploadProgress: progressEvent => {
                var i = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
                console.log(i);
                if(i!==100){
                    alert("Keliama")
                }else{
                    alert("Ikelta")
                }
            }
        })
            .then(function (response) {
                //console.log(response.data);
                self.setState({
                    tutorial: ''
                });
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    };
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div className={"tutorial-upload"}>
                    <div></div>
                    <form onSubmit={this.submitTutorial} className={"dashboard-cards-form"} encType={"multipart/form-data"} >
                        <div className={"dashboard-cards-title"}>Vaizdo pamoka</div>
                        <input onChange={this.changeTutorial} type="file" className={"dashboard-cards-input"} name="file" id="dashboard-cards-inputt" />
                        <label className={"dashboard-cards-label"} htmlFor="dashboard-cards-inputt">Pasirink pamoką</label>
                        <input type={"submit"} value={"Pakeisk"} className={"dashboard-cards-submit"}/>
                    </form>
                </div>
                <div className={"tutorial-player-container"}>
                </div>
                <div></div>
            </div>
        );
    }
}

export default TutorialControl;