import React from "react";

const LeftSideBar = ({ children }) => {
    return (
        <aside className="main-sidebar control-sidebar-dark">
            <section className="sidebar">
                {children}
            </section>
        </aside>
    );
};

LeftSideBar.propTypes = {
    children: React.PropTypes.node
};

export default LeftSideBar;
