import React from "react";

import GraphLoaderComponent from "../GraphLoader/GraphLoaderComponent";

export default ( {
    toggleHandler,
    settings
} ) => {
    const renderCheckboxes = () => {
        return settings.map((setting, index) => {
            return (
                <div className="form-group" key={index}>
                    <label className="control-sidebar-subheading ">
                        <input type="checkbox" className="pull-right" value={setting.name} checked={setting.value}
                               onChange={toggleHandler}/>
                        {setting.description}
                    </label>
                </div>
            );
        });
    };

    return (
    <div>
        <aside className="control-sidebar control-sidebar-dark">

            <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
                <li className="active"><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears" /></a></li>
                <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home" /></a></li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="control-sidebar-settings-tab">
                    <form method="post">
                        <ul className="sidebar-menu sidebar-topdown">
                            <li className="header"><span className="fa fa-picture-o" />&nbsp; Graph Settings</li>
                        </ul>
                        <div className="sidebar-padding">
                                {renderCheckboxes()}
                        </div>
                    </form>
                    <GraphLoaderComponent />
                </div>

                <div className="tab-pane" id="control-sidebar-home-tab">
                    <ul className="sidebar-menu sidebar-topdown">
                        <li className="header"><span className="fa fa-picture-o" />&nbsp; Some other settings</li>
                    </ul>

                    <ul className="sidebar-menu sidebar-topdown">
                        <li className="header"><span className="fa fa-picture-o" />&nbsp; Another settings</li>
                    </ul>
                </div>

            </div>
        </aside>
        <div className="control-sidebar-bg"></div>
    </div>
    );
};