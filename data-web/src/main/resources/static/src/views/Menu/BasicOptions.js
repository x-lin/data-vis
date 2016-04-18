import React from "react";

class BasicOptions extends React.Component {
    setFilterValue(name, value) {
        this.props.setFilterValue(name, value);
    }

    renderCheckbox(name, checked) {
        return (
            <label className="control-sidebar-subheading cursor" key={name}>
                {name}
                <input type="checkbox"
                  className="pull-right cursor"
                  checked={checked}
                  onChange={() => this.setFilterValue(name.toLowerCase(), !checked)}
                />
            </label>
        );
    }

    render() {
        return (
            <div className="">
                {this.renderCheckbox("Upstream", this.props.upstream)}
                {this.renderCheckbox("Downstream", this.props.downstream)}
            </div>
        );
    }
}

BasicOptions.propTypes = {
    setFilterValue: React.PropTypes.func.isRequired,
    upstream: React.PropTypes.string.isRequired,
    downstream: React.PropTypes.string.isRequired
};

export default BasicOptions;
