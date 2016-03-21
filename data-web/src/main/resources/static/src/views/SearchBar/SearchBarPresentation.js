import React from "react";

import SearchButton from "./SearchButton";
import SearchInputField from "./SearchInputField";
import SearchAutocomplete from "./SearchAutocomplete";
import SearchCategoryDropdown from "./SearchCategoryDropdown";

export default ( {
    activeCategory,
    activeInputValue,
    categories,
    items,
    inputChangeHandler,
    inputKeyDownHandler,
    submitHandler,
    } ) => {
    return (
                <form onSubmit={(event) => submitHandler(event)}>
            <div className="input-group relative">


                <SearchInputField
                    value={activeInputValue}
                    onChangeHandler={(event) => inputChangeHandler(event)}
                    onKeyDownHandler={(event) => inputKeyDownHandler(event)}
                />

                <SearchAutocomplete
                    items={items}
                />

                <SearchButton />
            </div>
        </form>
    );
};