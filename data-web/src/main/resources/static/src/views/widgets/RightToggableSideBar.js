import React from "react";

const SettingsSideBar = ({ children, hasPadding }) => {
    return (
        <div>
            <aside className="control-sidebar control-sidebar-dark">
                <div style={hasPadding && { padding: "10px" }}>
                    {children}
                </div>
            </aside>
            <div className="control-sidebar-bg"></div>
        </div>
    );
};

SettingsSideBar.propTypes = {
    children: React.PropTypes.node,
    hasPadding: React.PropTypes.bool
};

export default SettingsSideBar;
