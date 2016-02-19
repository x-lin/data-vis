import React from "react";
import { connect } from "react-redux";
import { getItem } from "../../actions/AJAXActions/GETItem";
import { getNeighbors } from "../../actions/AJAXActions/GETNeighbors";
import { clearItems } from "../../actions/ItemActions/FetchActionCreators";

import { reversePropertyMap, keyMap } from "../../config/Constants";

import Settings from "../../config/Settings";
import { indexOfObjectInArrayByProperty } from "../../utils/SearchHelpers";
import { RENDER_NEW_GRAPH_ON_SEARCH } from "../../actions/UserActions/SettingsActions"
import { updateGraph } from "../../actions/GraphActions/GraphActionCreators";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            category: Object.keys(reversePropertyMap)[0],
            selectedIndex: 0
        }
    };

    handleSubmit(event) {
        event.preventDefault();

        if(this.props.items.length > 0) {
            this.resetOnOptionSelection(this.props.items[this.state.selectedIndex]);
        } else {
            const index = indexOfObjectInArrayByProperty(this.props.settings, RENDER_NEW_GRAPH_ON_SEARCH, "name");
            if(this.props.settings[index].value) {
                this.props.updateGraphInStore({nodes: [], edges: []});
            }

            this.props.searchNeighbors(this.state.category, this.state.value);
        }
    };

    handleDropdownClick(category) {
        this.setState({category: category});
    };

    setValue(newValue) {
        this.state.value = newValue;
    }

    handleChange(event) {
        this.setValue(event.target.value);
        this.props.searchItem(this.state.category, event.target.value);
    };

    renderCategories() {
        const array = [];

        for(let category in reversePropertyMap) {
            array.push((<li key={category} onClick={() => this.handleDropdownClick(category)}><a href="#">{category}</a></li>));
        }

        return array;
    }

    handleOptionSelection(item) {
        this.resetOnOptionSelection(item);
    }

    resetOnOptionSelection(item) {
        this.setState({
            value: item[keyMap[this.state.category]],
            selectedIndex: 0
        });
        this.props.clearAllItems();
    }

    handleKeyDown(event) {
        if(event.keyCode === 40) {
            if(this.state.selectedIndex+1 < this.props.items.length) {
                this.setState({selectedIndex: this.state.selectedIndex+1});
            }
        }
        if(event.keyCode === 38) {
            if(this.state.selectedIndex > 0) {
                this.setState({selectedIndex: this.state.selectedIndex-1});
            }
        }
    }

    render() {
        var itemsList = this.props.items.map((item, index) => {
            const listgroupClass = "list-group-item cursor" + (this.state.selectedIndex === index ? " active" : "");
            return <li className={listgroupClass} key={index}
                       onClick={() => {this.handleOptionSelection(item)}}
                       onMouseOver={() => {this.setState({selectedIndex: index})}}
                   >
                {item[keyMap[this.state.category]]}</li>;
        });

        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="input-group">
                    <div className="input-group-btn search-panel">
                        <button type="button" className="btn  btn-default dropdown-toggle" data-toggle="dropdown">
                            <span id="search_concept">{this.state.category}</span> <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            {this.renderCategories()}
                        </ul>
                    </div>

                    {/*<div onKeyPress={(event) => this.handleKeyPress(event)}>
                        <Typeahead
                            options={this.props.items.map((item, index) => {
                                return item[keyMap[this.state.category]];
                            })}
                            onChange={(event) => this.handleChange(event)}
                            customClasses={{
                                input: "form-control",
                                results: "list-group list-z",
                                hover: "list-group-item list-group-item-info",
                                listItem: "list-group-item"
                            }}
                        />
                    </div>*/}

                    <input
                        value={this.state.value}
                        type="text"
                        className="form-control "
                        id="search"
                        onChange={(event) => this.handleChange(event)}
                        autoComplete="off"
                        onKeyDown={(event) => this.handleKeyDown(event)}
                        />

                    {this.props.items.length > 0 ?
                            <ul className="list-group list-z">
                                {itemsList}
                            </ul> : <span/>
                    }

                    <span className="input-group-btn">
                        {/*<button className="btn btn-default" ng-hide="loadedData">
                            <span className="glyphicon glyphicon-refresh glyphicon-spin" aria-hidden="true"></span>&nbsp;
                        </button>*/}
                        <button className="btn btn-default" type="submit">
                            <span className="glyphicon glyphicon-search " aria-hidden="true"></span>&nbsp;
                        </button>
                    </span>
                </div>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        items: state.items.data,
        settings: state.settings
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key) => {
            dispatch(getNeighbors(category, key));
        },
        searchItem: (category, key) => {
            dispatch(getItem(category, key));
        },
        updateGraphInStore: (name) => {
            dispatch(updateGraph(name));
        },
        clearAllItems: () => {
            dispatch(clearItems());
        }
    };
};

const SearchConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(Search);

export default SearchConnect;