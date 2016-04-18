import React from "react";

const HorizontalSplitView = ({ percentageUpper, children }) => {
    const percentage = (children[0] && children[1]) ? percentageUpper : 100;

    return (
        <div>
            <div style={{ height: `calc(${percentage}vh - 50px)` }}>
                {children[0] ? children[0] : children}
            </div>
            <div style={{ height: `calc(${100 - percentage}vh)`, overflow: "auto" }}>
                {children[1]}
            </div>
        </div>
    );
};

HorizontalSplitView.propTypes = {
    percentageUpper: React.PropTypes.number,
    children: React.PropTypes.node
};

export default HorizontalSplitView;
