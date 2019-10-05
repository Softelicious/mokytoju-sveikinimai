import React, {Component, useState, useEffect } from "react";
import StringValues from "../../../StringValues";
import {Link} from "react-scroll";
import axios from 'axios';
import Cookies from "universal-cookie";

class VideoControl2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            heightToggled: '540px',
            height: '0px',
            height2: '0px',
            one: {thumblain: ''},
            two: {thumblain: ''},
            three: {thumblain: ''},
            four: {thumblain: ''},
            index: {thumblain: '', video: ''},
            name: 'name',
            description: 'description',
        }
    }

    componentWillMount() {
        this.load();
    }

    load = () => {
        let cookie = new Cookies;
        axios.get("/api/admin/vids",{
            headers : {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }}).then(res => {
            this.setState({
                one: res.data[0],
                two: res.data[1],
                three: res.data[2],
                four: res.data[3],
            });
            console.log("video control simple load")
        }).catch();
    };

    load = (index) => {
        let cookie = new Cookies;
        axios.get("/api/admin/vids",{
            headers : {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }}).then(res => {
            this.setState({
                one: res.data[0],
                two: res.data[1],
                three: res.data[2],
                four: res.data[3],
            });
            switch (index) {
                case 0:
                    this.setState({
                       index:  res.data[0]
                    });
                    break;
                case 1:
                    this.setState({
                        index:  res.data[1]
                    });
                    break;
                case 2:
                    this.setState({
                        index:  res.data[2]
                    });
                    break;
                default:
                    this.setState({
                        index:  res.data[3]
                    });
                    break;
            }
            console.log("video control index load",this.state.index)
        }).catch();
    };

    click = (record) =>{
        this.setState({
            index: record,
            height: this.state.heightToggled,
            name: record.name,
            description: record.description,
        });
    };
    cliked1 = () => {  // nustato pasirinkta nuotrauka kuri gali buti viena is 4
        this.click(this.state.one);
    };
    clicked2 = () => {
        this.click(this.state.two);
    };
    clicked3 = () =>{
        this.click(this.state.three);
    };
    clicked4 = () =>{
        this.click(this.state.four);

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
        let cookie = new Cookies();
        const formData = new FormData();
        formData.append(`index`, this.state.index.id);
        formData.append(`name`, this.state.name);
        formData.append(`description`, this.state.description);
        axios({
            method: 'post',
            url: '/api/admin/updateDescriptionAndName',
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
        })
            .then(function (response) {
                self.load(self.state.index.id-1);
            })
            .catch(error => {
                console.log(error)
            })
    };
    onChangeVideo = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener('load', (ev) => {
                this.sendVideo(ev.target.result);
            });

        }
    };
    sendVideo = (video) => {

        let self = this;
        let cookie = new Cookies();
        const formData = new FormData();
        formData.append(`index`, this.state.index.id);
        formData.append(`video`, video);
        axios({
            method: 'post',
            url: '/api/admin/updateVideo',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                "Content-type": "multipart/form-data"
            }
        })
            .then(function (response) {
                self.load(self.state.index.id-1);
                console.log(response.data)
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
        let cookie = new Cookies();
        const formData = new FormData();
        formData.append(`index`, this.state.index.id);
        formData.append(`thumblain`, thumblain);
        axios({
            method: 'post',
            url: '/api/admin/updateThumblain',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                "Content-type": "multipart/form-data"
            }
        })
            .then(function (response) {
                self.load(self.state.index.id-1);
            })
            .catch(error => {
                console.log(error)
            })
    };
    render() {
        let style = {
          height: this.state.height
        };
        return (
            <>
              <div id={"container"}>
                  <div id={"title"}>
                      {StringValues.titleAds}
                  </div>
                  <div id={"content"}>
                      <div id={"ads"}>
                          <div id={"left"}>
                              <div id={"ad0"} style={{backgroundImage: `url(${this.state.one.thumblain})`}}>
                                  <Link smooth={true} to={"alsoInfo"}>
                                      <span onClick={this.cliked1} className={"biggerBtn playBtn fas fa-edit "}></span>
                                  </Link>
                              </div>
                          </div>
                          <div id={"right"}>
                              <div className={'rightWrap'} id={"ad1"} style={{backgroundImage: `url(${this.state.two.thumblain})`}}>
                                  <Link smooth={true} to={"alsoInfo"}>
                                      <span onClick={this.clicked2} className="playBtn fas fa-edit"></span>
                                  </Link>
                              </div>
                              <div className={'rightWrap'} id={"ad2"} style={{backgroundImage: `url(${this.state.three.thumblain})`}}>
                                  <Link smooth={true} to={"alsoInfo"}>
                                      <span onClick={this.clicked3} className="playBtn fas fa-edit"></span>
                                  </Link>
                              </div>
                              <div id={"ad3"} className={"alsoInfo rightWrap"} style={{backgroundImage: `url(${this.state.four.thumblain})`}}>
                                  <Link smooth={true} to={"alsoInfo"}>
                                      <span onClick={this.clicked4} className="playBtn fas fa-edit"></span>
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div style={style}  className="video-controll-toggle" >
                  <div className="video-controll-top">
                      <form className={"change-video-form"}>
                          <div className="video-controll-video">
                              <video src={this.state.index.video} controls>
                                  <source src={this.state.index.video} type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'/>
                                  <p>Sorry, but your browser does not support this video format.</p>
                              </video>
                              <input onChange={this.onChangeVideo} accept="video/mp4,video/x-m4v,video/*" style={{display: 'none'}} type="file"  name="video" id="videoChange"/>
                              <label className="video-controll-change" htmlFor="videoChange">Pakeisti</label>
                          </div>
                      </form>
                      <form  className={"change-thumblain-form"}  encType={"multipart/form-data"}>
                          <div className="video-controll-thumblain" style={{backgroundImage: `url(${this.state.index.thumblain})`}}>
                              <input onChange={this.onChangeThumblain} style={{display: 'none'}} accept="image/*" type="file"  name="thumblain" id="thumblainChange"/>
                              <label className="video-controll-change" htmlFor="thumblainChange">Pakeisti</label>
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
            </>
        );
    }
}
export default VideoControl2;
