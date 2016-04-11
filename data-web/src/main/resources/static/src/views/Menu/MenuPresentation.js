import React from "react";

import SideBarHeader from "../widgets/SideBarHeader";
import Slider from "../widgets/Slider";
import FileLoaderComponent from "../GraphLoader/FileLoaderComponent";
import FileSaverComponent from "../GraphLoader/FileSaverComponent";
import NewGraphComponent from "../GraphLoader/NewGraphComponent";
import Label from "../widgets/Label";
import LanePicker from "../LanePicker/LanePicker";
import BasicOptionsComponent from "./BasicOptionsComponent";
import NeighborExpansionComponent from "./NeighborExpansionComponent";
import Header from "../widgets/Header";

import { DropdownButton, MenuItem, OverlayTrigger, Popover } from "react-bootstrap";

export default ( {
    toggleHandler,
    valueHandler,
    settings,
    layout
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
            } else if(!isNaN(parseFloat(setting.value))) {
                return <li key={index} className={index === settings.length-1 ? "navbar-space" : ""}>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={index}><div style={{minWidth: "200px"}}>
                    <Header>{setting.shortDescription}</Header>
                    <Slider min={setting.min} max={setting.max}
                                defaultValue={setting.value}
                                step={setting.step}
                                onChange={() => valueHandler(setting.name, value)}
                        /></div></Popover>}>
                        <a title={setting.description}>
                            <span className={setting.menuButton} />
                            <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                        </a>
                    </OverlayTrigger>
                </li>;
            } else {
                return <li key={index} className={index === settings.length-1 ? "navbar-space" : ""}>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={index}>
                            <Header>{setting.shortDescription}</Header>
                            {setting.options.map((entry, index) => {
                                return <div className="cursor" style={{paddingBottom: "5px"}} onClick={() => valueHandler(setting.name, entry.key)} key={index}>
                                    <span style={{marginRight: "5px"}}>{entry.description}</span>
                                    <input type="radio" className="pull-right"
                                           checked={layout === entry.key}
                                           onChange={() => {}}
                                    />
                                </div>
                                })
                            }
</Popover>}>
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

            <li>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={"lanepicker"}><div style={{height: $(document).height() - 100}}><LanePicker /></div></Popover>}>
                    <a title="Group items">
                        <span className="fa fa-building-o" />
                        <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                    </a>
                </OverlayTrigger>
            </li>
            <li>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={"basicoptions"}>
                    <Header>Edge Directions</Header>
                    <BasicOptionsComponent />
                </Popover>}>
                    <a title="Edge directions">
                        <span className="fa fa-exchange" />
                        <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                    </a>
                </OverlayTrigger>
            </li>
            <li className="navbar-space">
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={"neighborexpansion"}>
                    <Header>Single Rendering Limit</Header>
                    <NeighborExpansionComponent />
                </Popover>}>
                    <a title="Limit for rendering of neighbor nodes">
                        <span className="fa fa-pencil-square-o" />
                        <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                    </a>
                </OverlayTrigger>
            </li>

            {renderEntries()}

            {/*<li><a href="#" title="Settings" data-toggle="control-sidebar"><i className="fa fa-gears" /></a></li>*/}
            <li><a href="#" title="Information" data-toggle="control-sidebar"><i className="fa fa-info" /></a></li>
        </ul>
    );
};