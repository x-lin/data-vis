import React from "react";

export default ({
    title,
    iconClass
}) => {
    return (
        <ul className="sidebar-menu">
            <li className="header">
                <span className={iconClass} />&nbsp; {title}
            </li>
        </ul>
    );
}