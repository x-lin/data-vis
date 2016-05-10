import React from "react";

const SearchAutocomplete = ({
    items,
    naviButtons
}) => {
    return (
        <div>
            {items && items.length > 0 ?
                <ul
                  className="list-group list-z"
                  style={{ right: "5px", left: "5px", top: "39px", position: "absolute" }}
                >
                    {items}
                    <li className="list-group-item cursor" style={{ padding: "1px" }}>
                        {naviButtons}
                    </li>
                </ul> : <span />
            }
        </div>
    );
};

SearchAutocomplete.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    naviButtons: React.PropTypes.element
};

export default SearchAutocomplete;
