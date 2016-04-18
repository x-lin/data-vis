import React from "react";

const SearchInputField = ({
    value,
    onChangeHandler,
    onKeyDownHandler
}) => {
    return (
        <div>
            <input
              value={value}
              type="text"
              className="form-control"
              id="search"
              autoComplete="off"
              onChange={(event) => onChangeHandler(event)}
              onKeyDown={(event) => onKeyDownHandler(event)}
              placeholder="Search..."
            />
        </div>
    );
};

SearchInputField.propTypes = {
    value: React.PropTypes.string,
    onChangeHandler: React.PropTypes.func.isRequired,
    onKeyDownHandler: React.PropTypes.func.isRequired
};

export default SearchInputField;
