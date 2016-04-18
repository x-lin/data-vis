import React from "react";

export default class extends React.Component {
    render() {
        return (
            <aside className="main-sidebar control-sidebar-dark">
                <section className="sidebar">
                    {this.props.children}
                </section>
            </aside>
        );
    }
}