import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';
import SearchGreetings from './SearchGreetings'
import Greeting from './Greeting';
import axios from 'axios';

class GreetingsSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            data: []
        }
    }

    onSearch = (e) =>{
        this.setState({
            search: e.target.value
        })
    };

    componentWillMount() {

        axios.get('/api/get').then(res =>
            {
                this.setState({
                    data: res.data
                })

            }
        ).catch();
    }

    render() {
        let filtered;
        filtered = this.state.data.filter((item) => {
            return item.teacher.toLowerCase().includes(this.state.search.toLowerCase())
        });
        return (
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
                            (data) => <Greeting key={data.id} data={data}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default GreetingsSection;