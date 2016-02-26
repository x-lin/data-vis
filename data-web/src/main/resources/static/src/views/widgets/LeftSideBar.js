import React from "react";

export default ({
    children
}) => {
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                {children}
            </section>
        </aside>
    );
}