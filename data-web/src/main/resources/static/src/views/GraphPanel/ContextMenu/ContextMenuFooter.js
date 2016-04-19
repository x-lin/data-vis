import React from "react";

import Constants from "../../../config/Constants";

const ContextMenuFooter = ({ d }) => {
    const { jamaId, projectId, type } = d;
    let { jiraId } = d;

    if (type === "User" || type === "Project") {
        jiraId = d.key;
    }

    const imgDir = "img/";
    const jiraAddress = Constants.getJiraAddress(type, jiraId);
    const jamaAddress = Constants.getJamaAddress(jamaId, projectId);

    const buttonClass = "btn btn-default btn-lg btn-flat btn-footer";

    return (
        <div className="footer row">
            <div className="pull-right" aria-label="Browse at source site">
                {jiraAddress &&
                <a type="button" className={buttonClass} href={jiraAddress} target="_blank">
                    <img src={`${imgDir}jira-logo.png`} height="20px" alt="JIRA logo" />
                </a>
                }
                {jamaAddress &&
                <a type="button" className={buttonClass} href={jamaAddress} target="_blank">
                    <img src={`${imgDir}jama-logo.png`} height="20px" alt="Jama logo" />
                </a>
                }
            </div>
        </div>
    );
};

ContextMenuFooter.propTypes = {
    d: React.PropTypes.object.isRequired
};

export default ContextMenuFooter;
