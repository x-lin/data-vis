import React from "react";

const Header = ({ children }) => {
    return (
        <div style={{ color: "#CCC", textTransform: "uppercase" }}>
            {children}
        </div>
    );
};

Header.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default Header;
