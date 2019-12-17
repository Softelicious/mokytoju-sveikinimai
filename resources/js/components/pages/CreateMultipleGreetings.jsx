import React, {Component} from 'react';
import TeachersContainer from "../layouts/TeachersContainer";
import StringValues from "../../StringValues";
import CardNormal from "../layouts/CardNormal";
import SearchTeachersContainer from "../layouts/SearchTeachersContainer";
import CardButtonsNormal from "../layouts/CardButtonsNormal";
import GreyBackground from "../layouts/GreyBackground";
import axios from "axios";
import PublicGreetingCreate from "../layouts/PublicGreetingCreate";
import CreatePublicGreeting from "./CreatePublicGreeting";
import UniquePublicGreetingCreate from "../layouts/UniquePublicGreetingCreate";

class CreateMultipleGreetings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: true,
            showSearch: false,
            teacherId: 0,
            visibleList: false,
            data: [],
            search: '',
            teachersArray: [],
        };
    }
    set = () => {
        this.setState({
            isOn: true
        })
    };
    toggleSearch = () => {
        this.setState({
            showSearch: !this.state.showSearch
        });
    };
    componentDidMount() {
        // const { match: { params } } = this.props;
        const params = this.props.params;
        this.setState({
            teacherId: params.id
        });
        axios.get(`/api/teachers/${params.id}`)
            .then(({ data }) => {
                let array = this.state.teachersArray;
                array.push(data);
                this.setState({
                    teachersArray: array
                });
            });
        axios.get(`/api/teachers`)
            .then(({ data }) => {
                this.setState({ data });
            }).catch();
    }

    listItemClick = (idTeacher) => {
        let array = this.state.teachersArray;
        let flag = false;
        axios.get(`/api/teachers/${idTeacher}`)
            .then(({ data }) => {
                array.map(item => {
                    if(item.id===data.id){
                        flag=true;
                    }
                });
                if(!flag){
                    array.push(data);
                }
                this.setState({
                    teachersArray: array
                });
            });
    };
    setListVisibility = (bool) => {
        this.setState({
            visibleList: bool
        })
    };
    search = (term) => {
        this.setState({
            search: term
        });
    };
    del = (item2) => {
        let array = this.state.teachersArray;
        array = array.filter(item => {
            return item.id !== item2.id;
        });
        this.setState({
            teachersArray: array
        });
    };
    greyClick = () => {
        this.setState({
            visibleList: false,
            showSearch: false
        })
    };
    renderGrey = () => {
        if(this.state.showSearch){
            return (
                <div onClick={this.greyClick}>
                    <GreyBackground/>
                </div>
            );
        }
    };
    render() {
        let filtered;
        filtered = this.state.data.filter((item) => {
            return item.name.toLowerCase().includes(this.state.search.toLowerCase())
        });
        return (
            <div className={"newGreetingContent"}>
                <TeachersContainer toggle={this.toggleSearch} teachersArray={this.state.teachersArray} del={this.del}/>
                <SearchTeachersContainer show={this.state.showSearch} search={this.search} toggle={this.toggleSearch} visible={this.setListVisibility}/>
                <div className={this.state.visibleList ? "landing-top-multiple-list-wrapper visible" : "landing-top-multiple-list-wrapper"}>
                    <ul>
                        {filtered.map((item, i) => {
                            return (
                                <li key={i} onClick={() => this.listItemClick(item.id)}>
                                    <a className={'linkStyle-greeting'}>
                                        {item.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {this.renderGrey()}
            </div>
        );
    }
}

export default CreateMultipleGreetings;
