import React from "react";

export default ( {
    items
} ) => {

    return (
        <div>
            {items.length > 0 ?
                <ul className="list-group list-z">
                    {items}
                </ul> : <span/>
            }
        </div>
    );
};