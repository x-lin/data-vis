import React from "react";

export default ({
    title,
    children,
    collapsed
    }) => {
    return (
        <div className={"box box-custom"}>
            <div className="box-header cursor">
                <h3 className="box-title box-title-custom">{title}</h3>
            </div>
            <div className="box-body box-content-custom">
                {children}
            </div>
        </div>
    );
}