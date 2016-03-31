import React from "react";

export default ( { rightWidth, children, height } ) => {
    const margin = (children[0] && children[1]) ? rightWidth : 0;

    return <div>
        <div style={{width: "100%", float: "left", marginRight: `-${margin}px`}}>
            <div style={{marginRight: `${margin}px`, height: height}}>
                {children[0] ? children[0] : children}
            </div>
        </div>
        <div style={{overflow: "auto", float: "right", width: `${margin}px`, height: height}}>
            {children[1]}
        </div>
    </div>
};