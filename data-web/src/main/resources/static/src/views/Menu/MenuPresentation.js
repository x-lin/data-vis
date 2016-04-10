import React from "react";

import SideBarHeader from "../widgets/SideBarHeader";
import Slider from "../widgets/Slider";
import FileLoaderComponent from "../GraphLoader/FileLoaderComponent";
import FileSaverComponent from "../GraphLoader/FileSaverComponent";
import NewGraphComponent from "../GraphLoader/NewGraphComponent";
import Label from "../widgets/Label";
import LanePicker from "../LanePicker/LanePicker";
import BasicOptionsComponent from "../GraphPanel/FilterSideBar/BasicOptionsComponent";
import NeighborExpansionComponent from "../GraphPanel/FilterSideBar/NeighborExpansionComponent";

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
            } else {
                return <li key={index} className={index === settings.length-1 ? "navbar-space" : ""}>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={index}><div style={{margin: "-9px -14px"}}>
                        {setting.options.map((entry, index) => {
                        console.log(layout, entry.key);
                        return <div className={`dropdown-content-item dropdown-content-item-hover cursor ${layout === entry.key ? "active" : ""}`} key={index} onClick={() => valueHandler(setting.name, entry.key)}>
                            {entry.description}
                        </div>
                        })}
</div></Popover>}>
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
                    <a title="">
                        <span className="fa fa-building-o" />
                        <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                    </a>
                </OverlayTrigger>
            </li>
            <li>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={"basicoptions"}>
                <div className={`box box-custom`}>
                    <div className="box-header cursor" data-widget="collapse">
                        <h3 className="box-title box-title-custom">Edge directions</h3>
                        <span className="fa fa-angle-left pull-right" />
                    </div>
                    <div className="box-body box-content-custom">
                        <BasicOptionsComponent />
                    </div>
                </div>
                </Popover>}>
                    <a title="Edge directions">
                        <span className="fa fa-exchange" />
                        <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                    </a>
                </OverlayTrigger>
            </li>
            <li className="navbar-space">
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover id={"neighborexpansion"}>
                    <div className={`box box-custom`}>
                        <div className="box-header cursor" data-widget="collapse">
                            <h3 className="box-title box-title-custom">Edge directions</h3>
                            <span className="fa fa-angle-left pull-right" />
                        </div>
                        <div className="box-body box-content-custom">
                            <NeighborExpansionComponent />
                        </div>
                    </div>
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