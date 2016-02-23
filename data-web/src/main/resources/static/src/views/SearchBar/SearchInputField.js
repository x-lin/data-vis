import React from "react";

export default ( {
    value,
    onChangeHandler,
    onKeyDownHandler,
} ) => {
    return (
        <div>
            <input
                value={value}
                type="text"
                className=" form-control"
                id="search"
                autoComplete="off"
                onChange={(event) => onChangeHandler(event)}
                onKeyDown={(event) => onKeyDownHandler(event)}
            />
        </div>
    );
};