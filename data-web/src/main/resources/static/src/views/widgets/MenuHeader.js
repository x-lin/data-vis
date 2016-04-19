import React from "react";

const Header = ({ children }) => {
    return (
        <div style={{ color: "#CCC", textTransform: "uppercase", paddingBottom: "5px" }}>
            {children}
        </div>
    );
};

Header.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default Header;
