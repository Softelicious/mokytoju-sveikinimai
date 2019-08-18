import React, {Component} from 'react';
import StringValues from "../../../StringValues";
import axios from "axios";
import {Link} from "react-router-dom";
import Greeting from "../Greeting";
import AdminGreeting from "./AdminGreeting";
import Cookie from "universal-cookie";

class PublicGreetingsControl extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            data: [],

        }
    }

    onSearch = (e) =>{
        this.setState({
            search: e.target.value
        })
    };
    load =()=>{
        axios.get('/api/get').then(res =>
            {
                this.setState({
                    data: res.data
                })

            }
        ).catch();
    };

    componentWillMount() {

        this.load();
    }

    render() {
        let filtered;
        filtered = this.state.data.filter((item) => {
            return item.teacher.toLowerCase().includes(this.state.search.toLowerCase())
        });
        return (
            <div className={"bookshelfContainer"}>
                <div className={"greetingsSection"}>
                    <div className={"greetingsTop"}>
                        <div className={"greetingsTitle"}>{StringValues.titleGreetings}</div>
                        <Link className={"linkStyle"} to={"/Sukurti"}>
                            <div className={"greetingsBtn list"}>
                                {StringValues.createBtnGreetings}
                            </div>
                        </Link>
                    </div>
                    <div className={"greetingsCenter"}>
                        <section className={"searchSection"}>
                            <form className={"searchFormGreetings"}>
                                <input onChange={this.onSearch} className={"inputSearchGreetings"} type={"text"} placeholder={StringValues.placeholderSearch} value={this.state.search}/><span className={"searchBtnGreetings fas fa-search fa-2x"}></span>
                            </form>
                        </section>
                    </div>
                    <div className={"greetingsBottom"}>
                        {
                            filtered.map(
                                (data) =>
                                    <AdminGreeting load={this.load} key={data.id} data={data}/>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicGreetingsControl;