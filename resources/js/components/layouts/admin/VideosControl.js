import React, {Component} from 'react';
import axios from "axios";
import Cookie from "universal-cookie";
import Video from "./Video";

class VideosControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            videoArray: [],
            vid_names: [],
            redirect: false,
            choose: 'Pasirink filmukus'
        };
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        var self = this;
        var i =0;
        var cookie = new Cookie();
        const formData = new FormData();
        const files = Array.from(this.state.videoArray);
        files.forEach((video_file) => {
            formData.append(`file${i}`, video_file);
            i++;

        });
        formData.append(`index`, i);

        axios({
            method: 'post',
            url: '/api/admin/uploadVideos',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                "Content-type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                var i = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
                if(i!==100){
                    alert("Keliama "+i)
                }else{
                    alert("Ikelta. Apdorojama...")
                }
            }
        })
            .then(function (response) {
                //console.log(response.data);
                self.setState({
                    videoArray: [],
                    choose: 'Pasirink filmukus'
                });
                self.load();
            })
            .catch(error => {
                console.log(error)
                self.setState({
                    videoArray: [],
                    choose: 'Pasirink filmukus'
                });
            })

    };
    handleFileChange = (e) =>{
        if (e.target.files) {
            const files = Array.from(e.target.files);

            files.map(file => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        this.setState({
                            videoArray: [...this.state.videoArray, ev.target.result]
                    })
                    });
                    reader.readAsDataURL(file);
            });

                this.setState({
                    choose: 'Filmukai pasirinkti'
                })
        }
    };
    load =()=>{
        var cookie = new Cookie();
        axios({
            method: 'get',
            url: '/api/getVideos',
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        }).then(res =>{
            this.setState({
                files: res.data.videos,
                vid_names: res.data.names
            });
            //console.log(res.data.sk+" - iteraciju is db vvideos - "+res.data.names)
        }).catch( err =>{
            console.log(err)
        });
    };
    componentWillMount() {
        this.load();
    }
    render() {
        return (
            <div >
                <div className="video-container">
                    <div id={"add-greetings-title"} style={{width: '360px'}}>
                        Reklamos Filmukai
                    </div>
                    {/*<div id={"add-greetings-content"}>*/}
                    <form onSubmit={this.handleSubmit} className={"dashboard-cards-form"} encType={"multipart/form-data"} >
                        <input onChange={this.handleFileChange} accept="video/*" type="file" className={"dashboard-cards-input"} name="dashboard-cards-input" id="dashboard-vids-input" multiple={true}/>
                        <label className={"dashboard-cards-label"} htmlFor="dashboard-vids-input">{this.state.choose}</label>
                        <input type={"submit"} value={"Įkelk"} className={"dashboard-cards-submit"}/>
                    </form>
                    {/*</div>*/}
                    <div className={"video-list"}>
                        {
                            this.state.files.map((data) =>
                                <Video load={this.load} key={data.id} id={data.id} path={data.path}/>
                            )

                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default VideosControl;