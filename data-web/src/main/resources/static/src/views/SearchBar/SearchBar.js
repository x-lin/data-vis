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
        const { items, selectedIndex } = this.props;
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
        // down key
        if (event.keyCode === 40) {
            if (this.props.selectedIndex + 1 < this.props.items.length) {
                this.props.setSearchSelectedIndex(this.props.selectedIndex + 1);
            }
        }
        // up key
        if (event.keyCode === 38) {
            if (this.props.selectedIndex > 0) {
                this.props.setSearchSelectedIndex(this.props.selectedIndex - 1);
            }
        }
        // ESC key
        if (event.keyCode === 27) {
            this.props.clearAllItems();
        }
        // Enter key
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();

            this.handleSubmit(event);
        }
    }

    renderItems() {
        return this.props.items.map((item, index) => {
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
    items: React.PropTypes.array.isRequired,
    clearAllItems: React.PropTypes.func.isRequired,
    setSearchSelectedIndex: React.PropTypes.func.isRequired,
    setSearchInputValue: React.PropTypes.func.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired,
    searchItem: React.PropTypes.func.isRequired
};

export default SearchBar;
