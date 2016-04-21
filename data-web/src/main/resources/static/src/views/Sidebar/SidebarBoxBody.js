import React from "react";

export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const START = "START";

const SidebarBoxBody = ({ children }) => {
    return (
        <div className="box-body">
            <div style={{maxHeight: "500px", overflow: "auto"}}>
                {children}
            </div>
        </div>
    );
};

SidebarBoxBody.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default SidebarBoxBody;
