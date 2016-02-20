import React from "react";

import Constants from "../../config/Constants";

import SearchBarPresent from "./SearchBarPresent";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            category: Object.keys(Constants.reversePropertyMap)[0],
            selectedIndex: 0
        }
    };

    handleSubmit(event) {
        event.preventDefault(); //done to disable site refreshes

        if(this.props.items.length > 0) {
            this.resetOnOptionSelection(this.props.items[this.state.selectedIndex]);
        } else {
            this.props.searchNeighborsStart(this.state.category, this.state.value);
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

        for(let category in Constants.reversePropertyMap) {
            array.push((<li key={category} onClick={() => this.handleDropdownClick(category)}><a href="#">{category}</a></li>));
        }

        return array;
    }

    handleOptionSelection(item) {
        this.resetOnOptionSelection(item);
    }

    resetOnOptionSelection(item) {
        this.setState({
            value: item[Constants.keyMap[this.state.category]],
            selectedIndex: 0
        });
        this.props.clearAllItems();
    }

    handleKeyDown(event) {
        //down key
        if(event.keyCode === 40) {
            if(this.state.selectedIndex+1 < this.props.items.length) {
                this.setState({selectedIndex: this.state.selectedIndex+1});
            }
        }
        //up key
        if(event.keyCode === 38) {
            if(this.state.selectedIndex > 0) {
                this.setState({selectedIndex: this.state.selectedIndex-1});
            }
        }
        //ESC key
        if(event.keyCode === 27) {
            this.props.clearAllItems();
        }
    }

    render() {
        var itemsList = this.props.items.map((item, index) => {
            const listgroupClass = "list-group-item cursor" + (this.state.selectedIndex === index ? " active" : "");
            return <li className={listgroupClass} key={index}
                       onClick={() => {this.handleOptionSelection(item)}}
                       onMouseOver={() => {this.setState({selectedIndex: index})}}
            >
                {item[Constants.keyMap[this.state.category]]}</li>;
        });

        const {category, value} = this.state;

        return (
            <SearchBarPresent
                activeCategory={category}
                activeInputValue={value}
                categories={this.renderCategories()}
                items={itemsList}
                inputChangeHandler={(event) => this.handleChange(event)}
                inputKeyDownHandler={(event) => this.handleKeyDown(event)}
                submitHandler={(event) => this.handleSubmit(event)}
            />
        );
    };
}