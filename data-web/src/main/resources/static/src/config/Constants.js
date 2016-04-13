import React from "react";

import stringToColor from "../utils/stringToColor";
import getContrastColor from "../utils/getContrastColor";
import TestCoverageComponent from "../views/TestCoveragePanel/TestCoverageComponent";

const Constants = {};

Constants.getColor = (string) => {
    return stringToColor(string);
};

Constants.hexadecToDecimal = (hex) => {
    return parseInt(hex, 16);
};

Constants.getContrastColor = (hexcode) => {
    return getContrastColor(hexcode);
};

Constants.endpoints = {
    GeneralNode: "generalNodes",
    Ticket: "issues",
    Project: "projects",
    User: "users ",
    Requirement: "reqs"
};

Constants.sidePanels = [
    {obj: <TestCoverageComponent />, key: "test"}
];

Constants.invisible = {
    Folder: false,
    Set: false
};

Constants.jiraAddresses = {
    Project: project => `http://jira.frequentis.frq/browse/${project}`,
    Defect: defect => `http://jira.frequentis.frq/browse/${defect}`,
    'Work Package': workpackage => `http://jira.frequentis.frq/browse/${workpackage}`,
    User: user => `https://jira.frequentis.frq/ViewProfile.jspa?name=${user}`
};

Constants.getEndpoint = (type) => {
    if(type === "Project") {
        return Constants.endpoints.Project;
    } else {
        return Constants.endpoints.GeneralNode;
    }
};

Constants.getJiraAddress = (type, key) => {
    return Constants.jiraAddresses[type] ? Constants.jiraAddresses[type](key) : null;
}

Constants.getJamaAddress = (jamaId, jamaProjectId) => {
    if(jamaProjectId && jamaId) {
        return `https://jama.frequentis.com/contour/perspective.req?docId=${jamaId}&projectId=${jamaProjectId}`;
    } else if(jamaId) {
        return `https://jama.frequentis.com/contour/perspective.req?projectId=${jamaId}`;
    }
}

export default Constants;