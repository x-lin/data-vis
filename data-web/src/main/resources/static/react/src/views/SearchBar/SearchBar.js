import React from "react";

import Constants from "../../config/Constants";

import SearchBarPresent from "./SearchBarPresentation";

export default class extends React.Component {
    render() {
        return (
            <SearchBarPresent
                activeCategory={this.props.category}
                categories={this.renderCategories()}

                activeInputValue={this.props.value}
                items={this.renderItems()}
                inputChangeHandler={(event) => this.handleChange(event)}
                inputKeyDownHandler={(event) => this.handleKeyDown(event)}

                submitHandler={(event) => this.handleSubmit(event)}
            />
        );
    };

    renderItems(){
        return this.props.items.map((item, index) => {
            const listgroupClass = " list-group-item cursor"
                + (this.props.selectedIndex === index ? " active" : "");

            return (
                <li className={listgroupClass} key={index}
                    onClick={() => {this.resetOnOptionSelection(item)}}
                    onMouseOver={() => {this.props.setSearchSelectedIndex(index)}}>
                    {item[this.getItemKey()]}
                </li>
            );
        });
    }

    renderCategories() {
        const array = [];

        for(let category in this.props.categories) {
            array.push((
                <li key={category} onClick={() => this.props.setSearchCategory(category)}>
                    <a href="#">{category}</a>
                </li>
            ));
        }

        return array;
    }

    handleSubmit(event) {
        const { items, selectedIndex, category, value } = this.props;
        event.preventDefault(); //done to disable site refreshes

        if(selectedIndex >= 0) {
            this.resetOnOptionSelection(items[selectedIndex]);
        } else {
            this.props.searchNeighborsStart(category, value);
        }
    };

    handleChange(event) {
        this.applyInputAndResetSelectionList(event.target.value);
        this.props.searchItem(this.props.category, event.target.value);
    };

    resetOnOptionSelection(item) {
        this.applyInputAndResetSelectionList(item[this.getItemKey()]);
        this.props.clearAllItems();
    }

    applyInputAndResetSelectionList(inputValue) {
        this.props.setSearchInputValue(inputValue);
        this.props.setSearchSelectedIndex(-1);
    }

    handleKeyDown(event) {
        //down key
        if(event.keyCode === 40) {
            if(this.props.selectedIndex+1 < this.props.items.length) {
                this.props.setSearchSelectedIndex(this.props.selectedIndex+1);
            }
        }
        //up key
        if(event.keyCode === 38) {
            if(this.props.selectedIndex >= 0) {
                this.props.setSearchSelectedIndex(this.props.selectedIndex-1);
            }
        }
        //ESC key
        if(event.keyCode === 27) {
            this.props.clearAllItems();
        }
    }

    getItemKey() {
        return Constants.keyMap[this.props.category];
    }
}