import React from "react";

const VerticalSplitView = ({ rightWidth, children, height }) => {
    const margin = (children[0] && children[1]) ? rightWidth : 0;

    return (
        <div>
            <div style={{ width: "100%", float: "left", marginRight: `-${margin}px` }}>
                <div style={{ marginRight: `${margin}px`, height }}>
                    {children[0] ? children[0] : children}
                </div>
            </div>
            <div style={{ overflow: "auto", float: "right", width: `${margin}px`, height }}>
                {children[1]}
            </div>
        </div>
    );
};

VerticalSplitView.propTypes = {
    rightWidth: React.PropTypes.number,
    children: React.PropTypes.node.isRequired,
    height: React.PropTypes.string.isRequired
};

export default VerticalSplitView;
