import React from "react";

export default class extends React.Component {
    render() {
        return (
            <!-- Main Header -->
            <header className="main-header">

                <!-- Logo -->
                <a href="index.html" className="logo">

                </a>

                <!-- Header Navbar -->
                <nav className="navbar navbar-static-top" role="navigation">
                    <!-- Sidebar toggle button-->
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <!-- Navbar Right Menu -->
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <!-- Control Sidebar Toggle Button -->
                            <li>
                                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    };
}