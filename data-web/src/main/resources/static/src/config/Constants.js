import React from "react";

import stringToColor from "../utils/stringToColor";
import TestCoverageComponent from "../views/TestCoveragePanel/TestCoverageComponent";
import StatsPanelComponent from "../views/StatsPanel/StatsPanelComponent";

const Constants = {};

Constants.getColor = (category) => {
    return stringToColor(category);
    //return Constants.colorMap[category] ? Constants.colorMap[category] : Constants.DEFAULT_COLOR;
};

Constants.hexadecToDecimal = (hex) => {
    return parseInt(hex, 16);
};

Constants.getContrastColor = (hexcode) => {
    const red = Constants.hexadecToDecimal(hexcode.substring(1,3));
    const green = Constants.hexadecToDecimal(hexcode.substring(3,5));
    const blue = Constants.hexadecToDecimal(hexcode.substring(5,7));

    return (red*0.299 + green*0.587 + blue*0.114) > 186 ? "#444" : "#FFF";
};

Constants.endpoints = {
    GeneralNode: "generalNodes",
    Ticket: "issues",
    Project: "projects",
    User: "users ",
    Requirement: "reqs"
};

Constants.sidePanels = [
    {object: <TestCoverageComponent />, key: "test"},
    {object: <StatsPanelComponent />, key: "stats"}
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