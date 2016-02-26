import React from "react";

import GraphLoaderComponent from "../GraphLoader/GraphLoaderComponent";
import SideBarHeader from "../widgets/SideBarHeader";

export default ( {
    toggleHandler,
    settings
} ) => {
    const renderCheckboxes = () => {
        return settings.map((setting, index) => {
            return (
                <div className="form-group" key={index}>
                    <label className="control-sidebar-subheading cursor">
                        <input type="checkbox" className="pull-right cursor" value={setting.name} checked={setting.value}
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
                        <div className="sidebar-topdown">
                            <SideBarHeader title="Graph Settings" iconClass="fa fa-picture-o" />
                        </div>

                        <div className="sidebar-padding">
                            {renderCheckboxes()}
                        </div>
                    <SideBarHeader title="Save to/Load from File" iconClass="fa fa-file-text" />
                    <GraphLoaderComponent />
                </div>

                <div className="tab-pane" id="control-sidebar-home-tab">
                    <div className="sidebar-topdown">
                        <SideBarHeader title="Some other settings" iconClass="fa fa-picture-o" />
                    </div>
                    <SideBarHeader title="Another settings" iconClass="fa fa-picture-o" />
                </div>

            </div>
        </aside>
        <div className="control-sidebar-bg"></div>
    </div>
    );
};