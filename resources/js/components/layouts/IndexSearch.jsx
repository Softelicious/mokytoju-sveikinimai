import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';
import axios from "axios";


class IndexSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            visibleList: false,
            visibleSelect: false,
            data: [],
            selected: -1,
            teacherId: 0,
            lastId: 0,
        }
    }
    componentWillMount() {
        axios.get('/api/teachers').then(res =>
            {
                this.setState({
                    data: res.data
                });
            }
        ).catch();
    }
    onChangeSearch = (e) => {
        if(e.target.value.length>0){
            this.setState({
                search: e.target.value,
                visibleList: true
            });
            return;
        }
        this.setState({
            search: '',
            visibleList: false,
            visibleSelect: false,
            selected: -1,
        });
    };
    listItemClick = (idList, idTeacher) => {
        this.setState({
            selected: idList,
            teacherId: idTeacher,
            visibleSelect: true
        })
    };
    render() {
        let filtered;
        let lastId;
        filtered = this.state.data.filter((item) => {
            return item.name.toLowerCase().includes(this.state.search.toLowerCase())
        });
        return (
            <section id={"section1"}>
                <form id={"form1"}>
                    <label id={"title1"}>{StringValues.titleSearch}</label>
                    <label id={"description1"}>{StringValues.descriptionSearch}</label>
                    <input onChange={this.onChangeSearch} id={"search1"} type={"text"}
                           placeholder={StringValues.placeholderSearch}
                           value={this.state.search}
                    />
                    <span id={"searchBtn"} className={" fas fa-search biggerSearch"}> </span>
                    <div className={"dropDown-IndexSearch"}>
                        <div className={this.state.visibleList ? "landing-top-list-wrapper visible" : "landing-top-list-wrapper"}>
                            <ul>
                                {filtered.map((answer, i) => {
                                    lastId = i;
                                    return (
                                        <li key={i} className={this.state.selected === i ? 'indexSearch-li-selected':''} onClick={() => this.listItemClick(i, answer.id)}>
                                            <div className={'linkStyle-greeting'}>
                                                {answer.name}
                                            </div>
                                        </li>
                                    )
                                })}
                                <li className={this.state.selected === lastId+1 ? 'indexSearch-li-selected':''} onClick={() => this.listItemClick(lastId+1, 1)}>
                                    <div className={'linkStyle-greeting'}>
                                        Tadas Adomauskas
                                    </div>
                                </li>
                                <li className={this.state.selected === lastId+2 ? 'indexSearch-li-selected':''} onClick={() => this.listItemClick(lastId+2, 2)}>
                                    <div className={'linkStyle-greeting'}>
                                        Neringa Nesiulyte
                                    </div>
                                </li>
                                <li className={this.state.selected === lastId+3 ? 'indexSearch-li-selected':''} onClick={() => this.listItemClick(lastId+3, 3)}>
                                    <div className={'linkStyle-greeting'}>
                                        Vidmantas Puteikis
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={this.state.visibleSelect ? "landing-top-selectType-wrapper visible-select" : "landing-top-selectType-wrapper"}>
                            <ul>
                                <Link to={StringValues.private_usual_card_path+ '/'+this.state.teacherId} className={'linkStyle'}>
                                    <li>
                                        <div className={'linkStyle-greeting'}>
                                            Įprastas
                                        </div>
                                    </li>
                                </Link>
                                <Link to={StringValues.private_unique_card_path+ '/'+this.state.teacherId} className={'linkStyle'}>
                                    <li>
                                        <div className={'linkStyle-greeting'}>
                                            Unikalus
                                        </div>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <Link id={"notFound1"} className={this.state.visibleList ? "linkStyle notFound1 notFound1Visible": "linkStyle notFound1"} to={StringValues.CreatePublicGreetings_path}>
                       {StringValues.notFoundSearch}
                    </Link>
                </form>
            </section>
        );
    }
}

export default IndexSearch;
