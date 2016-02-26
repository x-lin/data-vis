import React from "react";

import "./SideBarCollapsable.css";

export default ({
    title,
    children,
    collapsed
    }) => {
    return (
        <div className={`box box-custom${collapsed ? " collapsed-box" : ""}`}>
            <div className="box-header cursor" data-widget="collapse">
                <h3 className="box-title box-title-custom">{title}</h3>
                <span className="fa fa-angle-left pull-right" />
            </div>
            <div className="box-body box-content-custom">
                {children}
            </div>
        </div>
    );
}