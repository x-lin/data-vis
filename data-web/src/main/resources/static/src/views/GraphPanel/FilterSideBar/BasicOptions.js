import React from "react";

export default class extends React.Component {
    toggleCategoryFilter(name) {
        this.props.toggleFilterItemCategory(name);
    }

    render() {
        const g = () => {
            const { visibilityFilters } = this.props;
            const dom = [];

            for(let filter in visibilityFilters) {
                dom.push(
                    <label className="control-sidebar-subheading cursor" key={filter}>
                        {filter}
                        <input type="checkbox" className="pull-right cursor"
                            checked={visibilityFilters[filter] ? "checked" : null }
                            onChange={(e) => this.toggleCategoryFilter(filter)}
                        />
                    </label>
                );
            }

            return dom;
        };

        return (
        <form>
            <div className="form-group">
                {g()}
            </div>
        </form>
        );
    };
}