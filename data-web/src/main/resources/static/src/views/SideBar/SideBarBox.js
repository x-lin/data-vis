import React from "react";

import SidebarBoxBody from "./SidebarBoxBody";
import SideBarBoxHeader from "./SidebarBoxHeader";
import Spinner from "../widgets/Spinner";

export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const START = "START";

const SidebarBox = ({ title, labels, type, body, status, onClose, onCollapse, isCollapsed }) => {
    return (
        <div className="box box-solid">
            <SideBarBoxHeader
              labels={labels}
              widgetType={type}
              title={title}
              onClose={onClose}
              toggleCollapse={onCollapse}
              isCollapsed={isCollapsed}
            />

            {
                !isCollapsed &&
                <SidebarBoxBody>
                    {status === SUCCESS && body}
                    {status === ERROR && <span className="bg-red">An error occured!</span>}
                </SidebarBoxBody>
            }

            {status === START && <Spinner />}
        </div>
    );
};

SidebarBox.propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    body: React.PropTypes.element.isRequired,
    status: React.PropTypes.oneOf([SUCCESS, ERROR, START]),
    onClose: React.PropTypes.func.isRequired,
    isCollapsed: React.PropTypes.bool.isRequired,
    onCollapse: React.PropTypes.func.isRequired
};

export default SidebarBox;
