import React from "react";

import SideBarHeader from "../widgets/SideBarHeader";
import Slider from "../widgets/Slider";
import FileLoaderComponent from "../GraphLoader/FileLoaderComponent";
import FileSaverComponent from "../GraphLoader/FileSaverComponent";
import NewGraphComponent from "../GraphLoader/NewGraphComponent";
import Label from "../widgets/Label";

import { DropdownButton, MenuItem, OverlayTrigger, Popover } from "react-bootstrap";

export default ( {
    toggleHandler,
    valueHandler,
    settings
} ) => {
    const renderEntries = () => {
        return settings.map((setting, index) => {
            if(typeof setting.value === "boolean") {
                let clazz = setting.value ? "btn btn-default active btn-flat-custom" : "";

                return <li key={index} className={index === settings.length-1 ? "navbar-space" : ""}>
                    <a title={setting.description} className={clazz} onClick={(value) => toggleHandler(setting.name)}>
                        <span className={setting.menuButton} />
                    </a>
                </li>;
            } else {
                return <li key={index} className={index === settings.length-1 ? "navbar-space" : ""}>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={index}><div style={{minWidth: "200px", paddingTop: "5px"}}><Slider min={setting.min} max={setting.max}
                                defaultValue={setting.value}
                                step={setting.step}
                                onChange={function(value) {
                                            valueHandler(setting.name, value)}}
                        /></div></Popover>}>
                        <a title={setting.description}>
                            <span className={setting.menuButton} />
                            <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                        </a>
                    </OverlayTrigger>
                </li>;
            }

        })
    };

    return (
        <ul className="nav navbar-nav">
            <li><NewGraphComponent /></li>
            <li><a href="#" title="Load Graph From File"><FileLoaderComponent hasLabel={false} /></a></li>
            <li className="navbar-space"><FileSaverComponent /></li>

            <li className="navbar-space">
                <a title="">
                    <span className="fa fa-filter" />
                    <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                </a>
            </li>

            {renderEntries()}

            <li><a href="#" title="Settings" data-toggle="control-sidebar"><i className="fa fa-gears" /></a></li>
        </ul>
    );
};