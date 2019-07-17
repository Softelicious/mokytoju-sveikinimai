import React, {Component} from 'react';
import {Link} from "react-router-dom";
import StringValues from '../../StringValues';


class IndexSearch extends Component {
    render() {
        return (
            <section id={"section1"}>
                <form id={"form1"}>
                    <label id={"title1"}>{StringValues.titleSearch}</label>
                    <label id={"description1"}>{StringValues.descriptionSearch}</label>
                    <input id={"search1"} type={"text"} placeholder={StringValues.placeholderSearch} /><span id={"searchBtn"} className={" fas fa-search fa-3x"}></span>
                    <Link id={"notFound1"} className={"linkStyle"} to={StringValues.CreatePublicGreetings_path}>
                       {StringValues.notFoundSearch}
                    </Link>
                </form>
            </section>
        );
    }
}

export default IndexSearch;