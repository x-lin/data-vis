import React from "react";
import { connect } from "react-redux";
import { Tokenizer } from "react-typeahead";
import { getItem } from "../../actions/AJAXActions/GETItem";
import { getNeighbors } from "../../actions/AJAXActions/GETNeighbors";

import { reversePropertyMap, keyMap } from "../../config/Constants";

//TODO autocomplete
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: Object.keys(reversePropertyMap)[0]
        }
    };

    setRef(ref) {
        this.it = ref;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchNeighbors(this.state.category, this.it.value);
    };

    handleDropdownClick(category) {
        this.setState({category: category});
    };

    handleChange(event) {
        this.props.searchItem(this.state.category, event.target.value);
    };

    renderCategories() {
        const array = [];

        for(let category in reversePropertyMap) {
            array.push((<li key={category} onClick={() => this.handleDropdownClick(category)}><a href="#">{category}</a></li>));
        }

        return array;
    }

    render() {
        var itemsList = this.props.items.map((item, index) => {
            return <li className="list-group-item" key={index}> {item[keyMap[this.state.category]]} </li>;
        });

        return (
            <form autoComplete="off" onSubmit={(event) => this.handleSubmit(event)} method="post" action="">
                <div className="input-group">
                    <div className="input-group-btn search-panel">
                        <button type="button" className="btn  btn-default dropdown-toggle" data-toggle="dropdown">
                            <span id="search_concept">{this.state.category}</span> <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            {this.renderCategories()}
                        </ul>
                    </div>

                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        ref={(ref) => this.setRef(ref)}
                        onChange={(event) => this.handleChange(event)}

                        autoComplete="off"/>

                    {this.props.items.length > 0 ?
                        <div className="autocomplete ">
                            <ul className="list-group">
                                {itemsList}
                            </ul>
                        </div> : <span/>
                    }

                    <span className="input-group-btn">
                        {/*<button className="btn btn-default" ng-hide="loadedData">
                            <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
                        </button>*/}
                        <button className="btn btn-default" type="submit">
                            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp;
                        </button>
                    </span>
                </div>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        items: state.items.data
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key) => {
            dispatch(getNeighbors(category, key));
        },
        searchItem: (category, key) => {
            dispatch(getItem(category, key));
        }
    };
};

const SearchConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(Search);

export default SearchConnect;