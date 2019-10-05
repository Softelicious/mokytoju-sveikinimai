import React, {Component} from 'react';
import foto2 from "../../../../../public/assets/placeholders/tch.png";
import StringValues from "../../../StringValues";
import {Link} from "react-router-dom";
import axios from "axios";
import Cookie from "universal-cookie";

class AdminGreeting extends Component {

    delete = () => {
        let cookie = new Cookie();
        const formData = new FormData();
        formData.append(`index`, this.props.data.id);
        axios({
            method: 'post',
            url: '/api/admin/deletePublicGreeting',
            data: formData,
            headers: {
                'Authorization' : 'Bearer ' + cookie.get('access_token'),
            }
        })
            .then( res => {
                this.props.load()
            })
            .catch(err =>{
                console.log(err)
            })
    };
    render() {
        return (
            <div className={"greeting"}>
                <div className={"content"}>
                    <Link key={this.props.data.id} className={"linkStyle-greeting"}
                          to={ {
                              pathname: StringValues.OpenedGreeting,
                              state: {
                                  teacher: this.props.data.teacher,
                                  student: this.props.data.student,
                                  school: this.props.data.school,
                                  card_index: this.props.data.card_index,
                                  greeting: this.props.data.greeting,
                              }
                          }}
                    >
                        <div className={"leftContent"}>
                            <img src={foto2}/>
                        </div>
                    </Link>
                        <div className={"middleContent"}>
                            <div className={"fullName"}>
                                {this.props.data.teacher}
                            </div>
                            <div className={"school"}>
                                {this.props.data.school}
                            </div>
                        </div>
                    <div className={"rightContent"}>
                        <div onClick={this.delete} className="playGreeting fa fa-trash"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminGreeting;