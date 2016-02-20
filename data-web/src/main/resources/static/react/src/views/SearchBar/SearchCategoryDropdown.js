import React from "react";

export default ( {
    activeCategory,
    categories
    } ) => {

    return (
        <div className="input-group-btn search-panel">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <span id="search_concept">{activeCategory}</span> <span className="caret" />
            </button>
            <ul className="dropdown-menu" role="menu">
                {categories}
            </ul>
        </div>
    );
};