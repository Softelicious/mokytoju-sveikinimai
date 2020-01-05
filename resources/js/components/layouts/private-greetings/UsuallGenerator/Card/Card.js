import React, {Component} from 'react';
import axios from "axios";
import StringValues from "../../../../../StringValues";
import {Redirect} from "react-router";
import GreyBackgroundLoad from "../../../GreyBackgroundLoad";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-recaptcha";
import uuid from "uuid/v1";
import Modal from "react-awesome-modal";
import {TeacherContext} from "../../../../../contexts/TeacherContext";

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageArray: [],
            choose: 'Prisekite nuotraukas',
            modalIsOpen: false,
            styleChars: 11,
            teacher: '',
            student: '',
            school: '',
            card_index: 0,
            cards: [],
            load: false,
            max:0,
            greetings: [],
            gmax: 0,
            rand: 0,
            redirect: false,
            captcha: '',
            verified:'',
            picture: '',
            display: 'none',
            teacherArray: [],

        }
    }

    load = () => {
        axios({
            method: 'get',
            url: '/api/getCards',
        }).then(res =>{
            this.setState({
                cards: res.data.names,
                load: true,
                max: res.data.sk-1,

            });
        }).catch( err =>{
            console.log(err)
        });

        axios({
            method: 'get',
            url: '/api/getGreetings',
        }).then(res =>{
            this.setState({
                greetings: res.data.names,
                gmax: res.data.sk,

            });
            this.setState({
                rand: Math.floor(Math.random() * this.state.gmax)
            });
            console.log(res.data.names)
        }).catch( err =>{
            console.log(err)
        });
    };
    componentWillMount() {
        this.load();
        this.setState( {
            verified: this.props.verified,
            picture: this.props.picture,
            student: this.props.student,
            styleChars: this.props.student.length,
        });

        if(this.props.card_index !== undefined){
            this.setState( {
                card_index: this.props.card_index,
                teacher: this.props.teacher,
                school: this.props.school,
            });
        }


    }

    changeWidth  = (e) => {
        const lenth = e.target.value.length;

        this.setState({
            styleChars: lenth,
            student: e.target.value
        });
    };
    onChangeTeacher = (e) => {
        this.setState({
            teacher: e.target.value
        })
    };
    storeData = (captcha) => {
        console.log(this.state, this.context.teachers);
        let self=this;
        let bodyFormData = new FormData();
        let i=0;
        this.state.imageArray.forEach((image_file) => {
            bodyFormData.append(`file${i}`, image_file);
            i++;
        });
        bodyFormData.append(`index`, i);
        bodyFormData.append('student', this.state.student);
        bodyFormData.append('teachers', JSON.stringify(this.context.teachers));
        bodyFormData.append('greeting', this.state.greetings[this.state.rand]);
        bodyFormData.append('card', this.state.cards[this.state.card_index]);
        bodyFormData.append('captcha', captcha);
        bodyFormData.append('picture', this.state.picture);
        axios({
            method: 'post',
            url: '/api/store-private',
            data: bodyFormData,
            config:
                {
                    headers:
                        {
                            'Content-Type': 'multipart/form-data',

                        }
                }
        })
            .then(function (response) {
                if(response.data.success){
                    alert("Jūsų sveikinimas bus išsiųstas 10-5");
                    console.log(response.data.info);
                    self.setState({
                        redirect: true,
                        imageArray: [],
                        choose: 'Pasirink atvirutes'
                    });
                }else{
                    console.log('captcha or info', response.data.info);
                    alert("Recaptcha sako, kad robotas");
                    // self.changeDisplay('none')
                }
            })
            .catch(function (response) {
                alert("Nepavyko");
                // self.changeDisplay('none')
            });
    };
    submit = (e) => {
        e.preventDefault();
        this.openModal();
    };
    leftArrow = () => {
        if(this.state.card_index!==0){
            this.setState({

                card_index: this.state.card_index-1
            })
        }else{
            this.setState({

                card_index: this.state.max
            })
        }

    };
    rightArrow = () => {
        if(this.state.card_index!==this.state.max){
            this.setState({

                card_index: this.state.card_index+1
            })
        }else{
            this.setState({

                card_index: 0
            })
        }


    };
    onChangeSchool = (e) => {
        this.setState({
            school: e.target.value
        })
    };
    redirect = () => {
        if(this.state.redirect){
            const to = {
                pathname: StringValues.Greetings_path,
            };
            return (<Redirect to={to}/>);
        }
    };
    verifyCallback = (value) => {
        this.storeData(value);
        this.setState({
            captcha: value
        })
    };
    changeDisplay = (value) => {
        this.setState({
            display: value
        })
    };

    openModal = () =>{
        this.setState({modalIsOpen: true});
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    handleFileChange = (e) =>{
        if (e.target.files) {
            const files = Array.from(e.target.files);

            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                }))
            });

            Promise.all(promises).then(images => {
                console.log(images);
                this.setState({
                    imageArray: [...this.state.imageArray,...images],
                    choose: 'Nuotraukos pasirinktos'
                })
            }, error => { console.error(error); });
        }
    };
    imageList = () => {
        console.log("imageList", this.state.imageArray);
        this.state.imageArray.map((image) => {
            console.log(image);
            return (
                <div className={"thumb-card"}>
                    <img src={image} alt="image"/>
                    <i className={'fas fa-times'}></i>
                </div>
            );
        });
    };
    deletePinned = (index) => {
        let array = this.state.imageArray;
        array.splice(index, 1);
        this.setState({
            imageArray: array
        })
    };

    static contextType = TeacherContext;

    render() {
        let style;
        if(this.state.styleChars> 11){
            style = {width: this.state.styleChars*9+"px"}
        }
        return (
            <>
                <GreyBackgroundLoad display={this.state.display}/>
                <form  onSubmit={this.submit}>
                    <div className={"contentContainer"}>
                        <div className={"newGreetingContent"}>
                            <div className={"createTop"}>

                            </div>
                            <div className={"createSecond"}>
                                <div className={"card"} style={{backgroundImage:  `url(${this.state.cards[ this.state.card_index ]})`}}>
                                    <div className={"card-fb"}>
                                        <img className={"card-fb-img"} src={this.state.picture} alt=""/>
                                    </div>
                                </div>
                                <div className={"cardInfo"}>
                                    <div className={"infoTop"}>
                                        <h3>{StringValues.adress } (pasirinkti mokytoju vardai)</h3>
                                        <p>{this.state.greetings[this.state.rand]}</p>
                                    </div>
                                    <div className={"infoMiddle"}></div>
                                    <div className={"infoBottom"}>
                                        <div>{StringValues.adress2}</div>
                                        <div>{StringValues.thanks}</div>
                                        <div className={"adress-student"}>
                                            <div id={"adress3"}>
                                                {StringValues.adress3}
                                            </div>
                                            <div>
                                                <input required onChange={this.changeWidth} type="text"
                                                       style={style} id={"student-name"}
                                                       name={"student-name"} placeholder={"Įveskite vardą"} value={this.state.student}/>
                                            </div>
                                        </div>
                                        <div>
                                            (pasirinktų mokytojų mokyklos)
                                        </div>
                                    </div>
                                    <div className={'thumbs'}>
                                        <div className={'thumb-title'}>
                                            {this.state.imageArray.length>0?'Prisegta:':''}
                                        </div>
                                        <article className={"thumb-wrapper"}>
                                            {
                                                this.state.imageArray.map((value, index) =>
                                                    <div key={uuid()} className={"thumb-card"}>
                                                        <img src={value} alt=""/>
                                                        <i onClick={() => this.deletePinned(index)} className={'fas fa-times'}> </i>
                                                    </div>
                                                )
                                            }
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className={"createThird"}>
                                {StringValues.messageDelivery}
                            </div>
                            <div className={'wrapperStyleT'}>
                                <ul className={'leftStyleT'}>
                                    <li onClick={this.leftArrow} className=" fas fa-arrow-left fa-1x btnStyleT"> </li>
                                    <li className={'btnStyleT-noHover'} >{StringValues.cardStyle}</li>
                                    <li onClick={this.rightArrow} className=" fas fa-arrow-right fa-1x btnStyleT"> </li>
                                </ul>
                                <ul className={'middleStyleT'}>
                                    <label className={'btnStyleT btnStyle2T labelT'} htmlFor={'imgu'}>Pasirinkite nuotraukas</label>
                                    <input onChange={this.handleFileChange} accept="image/*" className={'btnStyleT btnStyle2T d-none'} id={'imgu'} name={'imgu'} type="file"/>
                                </ul>
                                <ul className={'rightStyleT'}>
                                    <input className={' btnStyleT btnStyle3T'} type={"submit"} value={StringValues.send}/>
                                </ul>
                            </div>
                        </div>
                    </div>

                </form>
                {this.redirect()}
                <Modal
                    visible={this.state.modalIsOpen}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className={'aw-wrapper'}>
                        <h4>Dar reikia, kad patvirtintumėte, kad esate žmogus</h4>
                        <div className={'aw-recaptcha'}>
                            <ReCAPTCHA
                                sitekey="6Lf2ibMUAAAAAMUMmwHWcwyTgk5FJjZjCfbDajsh"
                                render="explicit"
                                verifyCallback={this.verifyCallback}
                                onloadCallback={() => console.log('loaded')}
                            />
                        </div>
                    </div>
                </Modal>
            </>
        )


    }
}

export default Card;
