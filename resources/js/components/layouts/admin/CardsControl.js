import React, {Component} from 'react';
import Cookie from "universal-cookie";
import axios from "axios";
import Photo from "./Photo";

class CardsControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            imageArray: [],
            img_names: [],
            redirect: false,
        };
    }
     handleSubmit = (e) =>{
        e.preventDefault();
        var self = this;
        var i =0;
        var cookie = new Cookie();
        const formData = new FormData();
        this.state.imageArray.forEach((image_file) => {
            formData.append(`file${i}`, image_file);
            i++;
        });
        formData.append(`index`, i);

        axios({
            method: 'post',
            url: '/api/admin/uploadCards',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
                "Content-type": "multipart/form-data"
            }
        })
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    imageArray: []
                });
                self.load();
            })
            .catch(error => {
                console.log(error)
            })

    };
    handleFileChange = (e) =>{
        if (e.target.files) {
            const files = Array.from(e.target.files);

            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });

            Promise.all(promises).then(images => {
                this.setState({
                    imageArray: images
                })
            }, error => { console.error(error); });
        }
    };
    load =()=>{
        var cookie = new Cookie();
        axios({
            method: 'get',
            url: '/api/getCards',
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        }).then(res =>{
            this.setState({
                files: res.data.cards,
                img_names: res.data.names
            });
            console.log(res.data.sk+" - iteraciju is db - "+res.data.names)
        }).catch( err =>{
            console.log(err)
        });
    };
    componentWillMount() {
        this.load();
    }
    render() {
        return (
            <div className={"bookshelfContainer"}>
                <div className="dashboard-nav">
                    <div className={"dashboard-title"}>Admino panele</div>
                    <div onClick={this.logout} className={"btn dashboard-logout"}>Atsijungti</div>
                </div>
                <div className={"dashboard-cards"}>
                    <form onSubmit={this.handleSubmit} className={"dashboard-cards-form"} encType={"multipart/form-data"} >
                        <div className={"dashboard-cards-title"}>Atvirutės</div>
                        <input onChange={this.handleFileChange} type="file" className={"dashboard-cards-input"} name="dashboard-cards-input" id="dashboard-cards-input" multiple={true}/>
                        <label className={"dashboard-cards-label"} htmlFor="dashboard-cards-input">Pasirink atvirutes</label>
                        <input type={"submit"} value={"Įkelk"} className={"dashboard-cards-submit"}/>
                    </form>
                    <div className={"dashboard-cards-cardsContainer"}>
                        {
                            this.state.files.map((data) =>
                                <Photo load={this.load} key={data.id} id={data.id} path={data.path}/>
                            )

                        }
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default CardsControl;