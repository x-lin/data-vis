import React from "react";

import SideBarHeader from "../widgets/SideBarHeader";
import Slider from "../widgets/Slider";
import FileLoaderComponent from "../GraphLoader/FileLoaderComponent";
import FileSaverComponent from "../GraphLoader/FileSaverComponent";
import NewGraphComponent from "../GraphLoader/NewGraphComponent";

export default ( {
    toggleHandler,
    valueHandler,
    settings
} ) => {
    const renderEntries = () => {
        const settingsFiltered = settings.filter(setting => {
            return setting.menuButton && typeof setting.value === "boolean";
        });

        return settingsFiltered.map((setting, index) => {
            let clazz = setting.value ? "btn btn-default active btn-flat-custom" : "";

            return <li key={index} className={index === settingsFiltered.length-1 ? "navbar-space" : ""}>
                <a title={setting.description} className={clazz} onClick={(value) => toggleHandler(setting.name)}>
                    <span className={setting.menuButton} />
                </a>
            </li>
        })
    };

    return (
        <ul className="nav navbar-nav">
            <li><NewGraphComponent /></li>
            <li><a href="#" title="Load Graph From File"><FileLoaderComponent hasLabel={false} /></a></li>
            <li className="navbar-space"><FileSaverComponent /></li>

            {renderEntries()}

            <li><a href="#" title="Settings" data-toggle="control-sidebar"><i className="fa fa-gears" /></a></li>
        </ul>
    );
};