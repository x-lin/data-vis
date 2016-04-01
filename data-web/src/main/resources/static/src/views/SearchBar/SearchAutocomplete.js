import React from "react";

export default ( {
    items
} ) => {

    return (
        <div>
            {items.length > 0 ?
                <ul className="list-group list-z" style={{right: "5px", left: "5px", top: "39px", position: "absolute"}}>
                    {items}
                </ul> : <span/>
            }
        </div>
    );
};