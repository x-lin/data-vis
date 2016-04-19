import React from "react";
import RCSlider from "rc-slider";

const Slider = ({
    min,
    max,
    defaultValue,
    step,
    onChange
}) => {
    return (
        <div style={{ paddingTop: "5px" }}>
            <RCSlider defaultValue={defaultValue} min={min} max={max} onChange={onChange} step={step} />
            <span>{min}</span>
            <span className="pull-right">{max}</span>
        </div>
    );
};

Slider.propTypes = {
    min: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    defaultValue: React.PropTypes.number.isRequired,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired
};

export default Slider;
