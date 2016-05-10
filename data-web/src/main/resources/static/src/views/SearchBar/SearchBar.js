import React from "react";
import _debounce from "lodash/debounce";

import Constants from "../../config/Constants";
import SearchInputField from "./SearchInputField";
import SearchAutocomplete from "./SearchAutocomplete";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventValue: null
        };
    }

    componentWillMount() {
        this.searchItemDebounced = _debounce(this.searchItem, 200);
    }

    componentDidMount() {
        // Hide dropdown block on click outside the block
        window.addEventListener("click", () => this.cancel(), false);
    }

    componentWillUnmount() {
        window.removeEventListener("click", () => this.cancel(), false);
    }

    cancel() {
        this.props.clearAllItems();
    }

    handleSubmit(event) {
        const { selectedIndex } = this.props;
        const { items } = this.props.data;
        event.preventDefault(); // done to disable site refreshes

        const item = items[selectedIndex];
        const type = item.type === "Project" ? item.type : "GeneralNode";

        this.props.searchNeighborsStart(type, items[selectedIndex].key);
        this.props.setSearchInputValue("");
        this.props.clearAllItems();
    }

    handleChange(event) {
        this.applyInputAndResetSelectionList(event.target.value);

        this.state.eventValue = event.target.value;

        this.searchItemDebounced(event);
    }

    searchItem() {
        this.props.searchItem(this.props.type, this.state.eventValue);
    }

    applyInputAndResetSelectionList(inputValue) {
        this.props.setSearchInputValue(inputValue);
        this.props.setSearchSelectedIndex(-1);
    }

    handleKeyDown(event) {
        const { searchType, searchKey, setSearchSelectedIndex, selectedIndex, data, clearAllItems, searchItem } = this.props;
        // down key
        if (event.keyCode === 40) {
            if (selectedIndex + 1 < data.items.length) {
                setSearchSelectedIndex(selectedIndex + 1);
            }
        }
        // up key
        else if (event.keyCode === 38) {
            if (selectedIndex > 0) {
                setSearchSelectedIndex(selectedIndex - 1);
            }
        }
        //left key
        else if (event.keyCode === 37 && data.items) {
            if (data.startAt > 0) {
                searchItem(searchType, searchKey, data.startAt - 10);
                setSearchSelectedIndex(0);
            }
        }
        //right key
        else if (event.keyCode === 39  && data.items) {
            const endpointer = data.startAt + data.items.length;
            if (endpointer < data.count) {
                searchItem(searchType, searchKey, endpointer);
                setSearchSelectedIndex(0);
            }
        }
        // ESC key
        else if (event.keyCode === 27) {
            clearAllItems();
        }
        // Enter key
        else if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            this.handleSubmit(event);
        }
    }

    renderItems() {
        const { data } = this.props;

        if (data.items && data.items.length > 0) {
            return data.items.map((item, index) => {
                const listgroupClass = `list-group-item cursor ${this.props.selectedIndex === index ? "active" : ""}`;

                return (
                    <li className={listgroupClass} key={index}
                        onClick={(event) => this.handleSubmit(event)}
                        onMouseOver={() => this.props.setSearchSelectedIndex(index)}
                    >
                    <span className="label"
                          style={{
                          backgroundColor: Constants.getColor(item.type),
                          color: Constants.getContrastColor(Constants.getColor(item.type))
                      }}
                    >
                        {item.type}</span>
                        &nbsp; <strong>{item.name}</strong> | {item.key}
                    </li>
                );
            });
        } else {
            return null;
        }
    }



    renderNaviButtons() {
        const { searchItem, searchKey, searchType } = this.props;
        const { items, startAt, count } = this.props.data;

        if (items && items.length > 0) {

            const endpointer = startAt + items.length;
            const leftDisabled = startAt === 0;
            const rightDisabled = endpointer >= count;

            const enabled = { display: "table-cell", padding: "10px", };
            const disabled = Object.assign({}, enabled, {
                opacity: ".40",
                cursor: "not-allowed"
            })

            return (
                <div style={{ display: "table", width: "100%", textAlign: "center" }}>
                    <div style={leftDisabled ? disabled : enabled} className={leftDisabled ? "" : "activable"}
                         onClick={(event) => {
                            event.stopPropagation();

                            if (!leftDisabled) {
                                searchItem(searchType, searchKey, startAt - 10);
                            }
                         }}
                    >
                        <span className="fa fa-chevron-left" />
                    </div>
                    <div style={rightDisabled ? disabled : enabled} className={rightDisabled ? "" : "activable"}
                         onClick={(event) => {
                            event.stopPropagation();

                            if (!rightDisabled) {
                                searchItem(searchType, searchKey, endpointer);
                            }
                         }}
                    >
                        <span className="fa fa-chevron-right" />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="relative">

                    <SearchInputField
                      value={this.props.value}
                      onChangeHandler={(event) => this.handleChange(event)}
                      onKeyDownHandler={(event) => this.handleKeyDown(event)}
                    />

                    <SearchAutocomplete
                      items={this.renderItems()}
                      naviButtons={this.renderNaviButtons()}
                    />

                </div>
            </form>
        );
    }
}

SearchBar.propTypes = {
    value: React.PropTypes.string,
    type: React.PropTypes.string,
    selectedIndex: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
    clearAllItems: React.PropTypes.func.isRequired,
    setSearchSelectedIndex: React.PropTypes.func.isRequired,
    setSearchInputValue: React.PropTypes.func.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired,
    searchItem: React.PropTypes.func.isRequired,
    searchKey: React.PropTypes.string.isRequired,
    searchType: React.PropTypes.string.isRequired
};

export default SearchBar;
