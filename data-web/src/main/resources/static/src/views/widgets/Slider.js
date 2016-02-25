import React from "react";
import Slider from "rc-slider";
import "./Slider.css";

export default ( { min, max, defaultValue, onChange }) => {
    return (
        <div style={{marginTop: "10px"}}>
            <Slider defaultValue={defaultValue} min={min} max={max} onChange={onChange} />
        </div>
    );
};

