import React from "react";

export default ( {
    items
} ) => {

    return (
        <div>
            {items.length > 0 ?
                <ul className="list-group list-z" style={{right: "5px", left: "5px", top: "39px"}}>
                    {items}
                </ul> : <span/>
            }
        </div>
    );
};