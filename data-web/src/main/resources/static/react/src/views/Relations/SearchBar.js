import React from "react";
import { connect } from "react-redux";
import { Tokenizer } from "react-typeahead";
import { getItem } from "../../actions/AJAXActions/GETItem";
import { getNeighbors } from "../../actions/AJAXActions/GETNeighbors";

import { reversePropertyMap } from "../../config/Constants";

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

    search() {
        this.props.onSearchSubmit(this.state.category, this.it.value);
    };

    handleClick(category) {
        console.log("setting ", category);
        //this.state.category = category;
        this.setState({category: category});
    }

    renderCategories() {
        const array = [];

        for(let category in reversePropertyMap) {
            array.push((<li key={category} onClick={() => this.handleClick(category)}><a href="#">{category}</a></li>));
        }

        return array;
    }

    render() {
        return (
            <div className="row search-container">
                <form onSubmit={() => this.search()}>
                    <div className="input-group">
                        <div className="input-group-btn search-panel">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <span id="search_concept">{this.state.category}</span> <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                                {this.renderCategories()}
                            </ul>
                        </div>

                        <input type="text" className="form-control" id="search" ref={(ref) => this.setRef(ref)}/>

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
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        onSearchSubmit: (category, key) => {
            dispatch(getNeighbors(category, key));
        }
    };
};

const SearchConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(Search);

export default SearchConnect;