import React from "react";
import Slider from "rc-slider";
import "./Slider.css";

export default ( { min, max, defaultValue, step, onChange }) => {
    return (
        <div>
            <Slider defaultValue={defaultValue} min={min} max={max} onChange={onChange} step={step} />
            <span>{min}</span>
            <span className="pull-right">{max}</span>
        </div>
    );
};

