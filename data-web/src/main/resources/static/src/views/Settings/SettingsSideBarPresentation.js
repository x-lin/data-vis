import React from "react";

import SideBarHeader from "../widgets/SideBarHeader";
import Slider from "../widgets/Slider";

export default ( {
    toggleHandler,
    valueHandler,
    settings
    } ) => {

    return (
        <div>
            <aside className="control-sidebar control-sidebar-dark">

                <div style={{padding: "10px", color: "#000000"}}>
                    <div className="box box-default">
                        <div className="box-body">
                            <p>
                                <strong>General graph panel behaviors</strong><br/>
                            </p>

                            <p>
                                <code>MOUSE WHEEL</code>: Zooming. <br/>
                                <code>LEFT CLICK</code> or <code>MOUSE WHEEL</code> + <code>MOUSE MOVE</code>: Panning. <br/>
                            </p>
                            <p>
                                <strong>Custom node behaviors</strong><br/>
                            </p>
                            <p>
                                <code>MOUSE HOVER</code>: Tooltip. <br/>
                                <code>RIGHT CLICK</code>: Custom context menu. <br/>
                                <code>DOUBLE LEFT CLICK/</code>: Node expansion. <br/>
                                <code>CTRL + LEFT CLICK</code>: Marking connected nodes. To release: <code>LEFT CLICK</code> on any node. <br/>
                            </p>
                        </div>
                    </div>
                    <div className="box box-default">
                        <div className="box-body">
                            <p>
                                <strong>About the data</strong>
                            </p>

                            <ul style={{paddingLeft: "1.2em"}}>
                                <li>Pulled from Jama and JIRA.</li>
                                <li>Items with status "Deleted" in Jama or status "Closed" in JIRA are not stored / will be deleted.</li>
                                <li>Relationships from Jama are stored as unidirectional edges, relationships from JIRA as bidirectional edges. Relationships that exist in both use Jama mappings.</li>
                                <li>Parent/children relationships are treated equally to upstream/downstream relationships (i.e., no difference in querying).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="control-sidebar-bg"></div>
        </div>
    );
};

//export default ( {
//    toggleHandler,
//    valueHandler,
//    settings
//} ) => {
//    const renderCheckboxes = () => {
//        return settings.map((setting, index) => {
//            return (
//                <div className="form-group" key={index}>
//                    {typeof setting.value === "boolean" ?
//                        <label className="control-sidebar-subheading cursor">
//                            <input type="checkbox" className="pull-right cursor" value={setting.name} checked={setting.value}
//                                   onChange={toggleHandler}/>
//                            {setting.description}
//                        </label>
//                        :
//                    <div>
//                            <label className="control-sidebar-subheading cursor">
//                                {setting.description}
//                            </label>
//                            <div>
//                                {/*<Slider min={setting.min} max={setting.max}
//                                        defaultValue={setting.value}
//                                        step={setting.step}
//                                        onChange={function(value) {
//                                            valueHandler(setting.name, value)}}
//                                />*/}
//                            </div>
//                        </div>
//                    }
//
//                </div>
//            );
//        });
//    };
//
//    return (
//    <div>
//        <aside className="control-sidebar control-sidebar-dark">
//
//            <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
//                <li className="active"><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears" /></a></li>
//                <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home" /></a></li>
//            </ul>
//
//            <div className="tab-content">
//                <div className="tab-pane active" id="control-sidebar-settings-tab">
//                        <div className="sidebar-topdown">
//                            <SideBarHeader title="Graph Settings" iconClass="fa fa-picture-o" />
//                        </div>
//
//                        <div className="sidebar-padding">
//                            {renderCheckboxes()}
//                        </div>
//                </div>
//
//                <div className="tab-pane" id="control-sidebar-home-tab">
//                    <div className="sidebar-topdown">
//                        <SideBarHeader title="Some other settings" iconClass="fa fa-picture-o" />
//                    </div>
//                    <SideBarHeader title="Another settings" iconClass="fa fa-picture-o" />
//                </div>
//
//            </div>
//        </aside>
//        <div className="control-sidebar-bg"></div>
//    </div>
//    );
//};