import React from "react";

import Constants from "../../config/Constants";

import SearchBarPresent from "./SearchBarPresentation";
import CircleSpan from "../widgets/CircleSpan";

export default class extends React.Component {
    render() {
        return (
            <SearchBarPresent
                activeCategory={this.props.type}
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
                    <CircleSpan radius="8px" color={Constants.getColor(item.type)}/> &nbsp; {item.type  + " | " + item.key + " | " + item.name}
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
        const { items, selectedIndex, value } = this.props;
        event.preventDefault(); //done to disable site refreshes

        console.log(items[selectedIndex]);

        const item = items[selectedIndex];
        const type = item.type === "Project" ? item.type : "GeneralNode";

        this.props.searchNeighborsStart(type, items[selectedIndex].key);
        this.props.setSearchInputValue("");
        this.resetOnOptionSelection(items[selectedIndex]);

        //if(selectedIndex >= 0) {
        //    this.resetOnOptionSelection(items[selectedIndex]);
        //} else {
        //    this.props.searchNeighborsStart(type, value);
        //    this.props.setSearchInputValue("")
        //}
    };

    handleChange(event) {
        this.applyInputAndResetSelectionList(event.target.value);
        this.props.searchItem(this.props.type, event.target.value);
    };

    resetOnOptionSelection(item) {
        //this.applyInputAndResetSelectionList(item[this.getItemKey()]);
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
}