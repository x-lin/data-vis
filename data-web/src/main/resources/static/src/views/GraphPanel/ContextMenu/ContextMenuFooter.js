import React from "react";

import Constants from "../../../config/Constants";

export default ( { d } ) => {
    let { jiraId, jamaId, projectId, type } = d;

    //TODO fix that for extraction -> add jiraId
    if(type === "User" || type === "Project") {
        jiraId = d.key;
    }

    const imgDir = "img/";
    const jiraAddress = Constants.getJiraAddress(type, jiraId);
    const jamaAddress = Constants.getJamaAddress(jamaId, projectId);

    return <div className="footer row">
        <div className="pull-right" aria-label="Browse at source site">
            {jiraAddress &&
            <a type="button" className="btn btn-default btn-lg btn-flat btn-footer" href={jiraAddress} target="_blank">
                <img src={`${imgDir}jira-logo.png`} height="20px" />
            </a>
            }
            {jamaAddress &&
            <a type="button" className="btn btn-default btn-lg btn-flat btn-footer " href={jamaAddress} target="_blank">
                <img src={`${imgDir}jama-logo.png`} height="20px" />
            </a>
            }
        </div>
    </div>;
}