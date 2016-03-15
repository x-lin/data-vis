import React from "react";

export default class extends React.Component {
    //done, so that scroll bar won't disappear after a page change
    componentDidMount() {
        if (typeof $.fn.slimScroll != "undefined") {
            //Destroy if it exists
            $(".sidebar").slimScroll({destroy: true}).height("auto");
            //Add slimscroll
            $(".sidebar").slimscroll({
                height: ($(window).height() - $(".main-header").height()) + "px",
                color: "rgba(0,0,0,0.2)",
                size: "3px"
            });
        }
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    {this.props.children}
                </section>
            </aside>
        );
    }
}