import React from "react";

const SideBarCollapsable = ({
    title,
    children
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
};

SideBarCollapsable.propTypes = {
    title: React.PropTypes.node.isRequired,
    children: React.PropTypes.node
};

export default SideBarCollapsable;
