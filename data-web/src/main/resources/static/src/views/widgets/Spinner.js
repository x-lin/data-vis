import React from "react";

const Spinner = () => {
    const style = {
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "3px",
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
    };

    const spinnerStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: "-15px",
        marginTop: "-15px",
        color: "#000",
        fontSize: "30px"
    };

    return (
        <div style={style}>
            <i className="fa fa-refresh fa-spin" style={spinnerStyle} />
        </div>
    );
};

export default Spinner;
