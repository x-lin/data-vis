import React from "react";

import Constants from "../../config/Constants";
import Label from "../widgets/Label";

const SidebarBoxHeader = ({ widgetType, labels, title, onClose }) => {
    const spanLabels = labels.map((label, index) => {
        return (
            <Label bgColor={Constants.getColor(label)} key={index}>{label}</Label>
        );
    });


    return (
        <div className="box-header with-border">
            <p>
                <span className="label label-default">{widgetType}</span>&nbsp;
                {spanLabels}
            </p>
            <h3 className="box-title">
                <strong>{title}</strong>
            </h3>
            <div className="box-tools pull-right">
                {/*<button className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="">
                    <span className="fa fa-minus" />
                </button>*/}
                <button type="button" className="btn btn-box-tool" onClick={onClose}>
                    <span className="fa fa-times" />
                </button>
            </div>
        </div>
    );
};

SidebarBoxHeader.propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string.isRequired,
    widgetType: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired
};

export default SidebarBoxHeader;
