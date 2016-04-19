import React from "react";

import InfoSideBar from "./Settings/InfoSideBar";
import MenuContainer from "./Menu/MenuContainer";

const Main = ({ children }) => {
    return (
        <div>
            <header className="main-header">

                <a name="Frequentis Logo" className="logo disabled-link">
                    &nbsp;
                    <img src="img/frequentis-logo.gif" width="120px" alt="Frequntis logo" />
                </a>

                <nav className="navbar navbar-static-top">
                    <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                        <ul className="nav navbar-nav">
                        </ul>
                    </div>

                    <div className="navbar-custom-menu">
                        <MenuContainer />
                    </div>
                </nav>
            </header>

            <InfoSideBar />

            <div className="content-wrapper">
                {children}
            </div>

        </div>
    );
};

Main.propTypes = {
    children: React.PropTypes.node
};

export default Main;
