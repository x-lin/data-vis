import React from "react";

export default ( {
    buttonClass,
    iconClass,
    onChange,
    title
} ) => {
    return (
        <div className={buttonClass}>
            <span className={iconClass} />
            <input type="file" onChange={onChange} /> &nbsp;
            {title}
        </div>
    );
};

