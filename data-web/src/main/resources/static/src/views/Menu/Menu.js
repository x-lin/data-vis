import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import Slider from "../widgets/Slider";
import FileLoaderComponent from "../GraphLoader/FileLoaderContainer";
import FileSaverComponent from "../GraphLoader/FileSaverContainer";
import NewGraphComponent from "../GraphLoader/NewGraphContainer";
import Label from "../widgets/Label";
import Header from "../widgets/MenuHeader";
import MenuLanePicker from "./MenuLanePicker";
import MenuEdgeDirections from "./MenuEdgeDirections";
import MenuRenderingLimit from "./MenuRenderingLimit";

const Menu = ({
    toggleHandler,
    valueHandler,
    settings,
    layout
    }) => {
    const renderEntries = () => {
        return settings.map((setting, index) => {
            const liClass = (index === settings.length - 1) ? "navbar-space" : "";
            
            if (typeof setting.value === "boolean") {
                let clazz = setting.value ? "btn btn-default active btn-flat-custom" : "";

                return (
                    <li key={index} className={liClass}>
                        <a title={setting.description} className={clazz} onClick={() => toggleHandler(setting.name)}>
                            <span className={setting.menuButton} />
                        </a>
                    </li>
                );
            } else if (!isNaN(parseFloat(setting.value))) {
                const popover = (
                    <Popover id={index}>
                        <div style={{ minWidth: "200px" }}>
                            <Header>{setting.shortDescription}</Header>
                            <Slider min={setting.min} max={setting.max}
                              defaultValue={setting.value}
                              step={setting.step}
                              onChange={(value) => valueHandler(setting.name, value)}
                            />
                        </div>
                    </Popover>
                );

                return (
                    <li key={index} className={liClass}>
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                            <a title={setting.description}>
                                <span className={setting.menuButton} />
                                <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                            </a>
                        </OverlayTrigger>
                    </li>
                );
            } else {
                const options = setting.options.map((entry, index) => {
                    return (
                        <div className="cursor"
                          style={{ paddingBottom: "5px" }}
                          onClick={() => valueHandler(setting.name, entry.key)}
                          key={index}
                        >
                            <span style={{ marginRight: "5px" }}>{entry.description}</span>
                            <input type="radio" className="pull-right"
                              checked={layout === entry.key}
                              onChange={() => {}}
                            />
                        </div>
                    );
                });

                const popover1 = (
                    <Popover id={index}>
                        <Header>{setting.shortDescription}</Header>
                        {options}
                    </Popover>
                );

                return (
                    <li key={index} className={liClass}>
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover1}>
                            <a title={setting.description}>
                                <span className={setting.menuButton} />
                                <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
                            </a>
                        </OverlayTrigger>
                    </li>
                );
            }
        });
    };

    return (
        <ul className="nav navbar-nav">
            <li><NewGraphComponent /></li>
            <li><FileLoaderComponent hasLabel={false} /></li>
            <li className="navbar-space"><FileSaverComponent /></li>

            <li><MenuLanePicker /></li>
            <li><MenuEdgeDirections /></li>
            <li className="navbar-space"><MenuRenderingLimit /></li>

            {renderEntries()}

            <li><a href="#" title="Information" data-toggle="control-sidebar"><i className="fa fa-info" /></a></li>
        </ul>
    );
};

Menu.propTypes = {
    toggleHandler: React.PropTypes.func.isRequired,
    valueHandler: React.PropTypes.func.isRequired,
    settings: React.PropTypes.array.isRequired,
    layout: React.PropTypes.string.isRequired
};

export default Menu;
