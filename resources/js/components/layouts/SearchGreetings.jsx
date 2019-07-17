import React, {Component} from 'react';
import StringValues from '../../StringValues';


class SearchSection extends Component {
    render() {
        return (
            <section className={"searchSection"}>
                <form className={"searchFormGreetings"}>
                    <input className={"inputSearchGreetings"} type={"text"} placeholder={StringValues.placeholderSearch} /><span className={"searchBtnGreetings fas fa-search fa-2x"}></span>
                </form>
            </section>
        );
    }
}
export default SearchSection;