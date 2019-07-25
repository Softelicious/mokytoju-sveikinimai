import React, {Component} from 'react';
import {Link} from "react-router-dom";
import FixedCircle from "../../layouts/FixedCircle";
import LandingTop from "../../layouts/LandingTop";
import LandingBottom from "../../layouts/LandingBottom";
import Footer from "../../layouts/Footer";
import Greeting from "../../layouts/Greeting";
import axios from "axios";
import Photo from "./Photo";
import Cookie from "universal-cookie";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            card: '',
            uploading: ''
        }

    }
    componentWillMount() {
        // const cookie = new Cookie();
        // axios.get("/api/admin/getCards", {
        //     headers : {
        //         'Authorization' : 'Bearer ' + cookie.get('access_token')
        //     }}).then(res =>
        //     {
        //         this.setState({
        //             cards: res.data
        //         })
        //
        //     }
        // ).catch();
    }

    onChangePhoto = (e) =>{

        const files = Array.from(e.target.files)
        this.setState({
            uploading: true,
            files: files
        });

    };


    uploadPhoto = (e) => {
        e.preventDefault();
        const cookie = new Cookie();
        const formData = new FormData()
        var $index;
        this.state.files.forEach((file, i) => {
            formData.append(`${i}`, file);
            $index = i;
        });
        formData.append('index', $index);
        //formData.append(`nuotrauka`, this.state.files[0]);
        axios({
            method: 'post',
            url: '/api/admin/uploadCards',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token')
            }
        })
            .then(function (response) {
                console.log(response.data.images)
                this.setState({
                    files: []
                });
            })
            .catch(function (response) {
                alert("Nepavyko");

            });
        //console.log(this.state.files);
    };

    render() {
        return (
            <div className={"dashboard-container"}>
                <FixedCircle/>
                <div className={"bookshelfContainer"}>
                    <div className="dashboard-nav">
                        <div className={"dashboard-title"}>Admino panele</div>
                        <div className={"btn dashboard-logout"}>Atsijungti</div>
                    </div>

                    <div className={"dashboard-cards"}>
                        <form onSubmit={this.uploadPhoto} className={"dashboard-cards-form"} encType={"multipart/form-data"} >
                            <div className={"dashboard-cards-title"}>Atvirutės</div>
                            <input onChange={this.onChangePhoto} type="file" className={"dashboard-cards-input"} name="dashboard-cards-input" id="dashboard-cards-input" multiple={true}/>
                            <label className={"dashboard-cards-label"} htmlFor="dashboard-cards-input">Pasirink atvirutes</label>
                            <input type={"submit"} value={"Įkelk"} className={"dashboard-cards-submit"}/>
                        </form>
                        <div className={"dashboard-cards-cardsContainer"}>
                            {/*{*/}
                            {/*    this.state.files.map(*/}
                            {/*        (data) => <Photo  data={data}/>*/}
                            {/*    key={data.id}*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>
                    </div>

                </div>
                <LandingBottom/>
            </div>

        );
    }
}

export default Dashboard;