import React from "react";

import stringToColor from "../utils/stringToColor";
import getContrastColor from "../utils/getContrastColor";
import TestCoverageComponent from "../views/TestCoveragePanel/TestCoverageTableContainer";

const Constants = {};

Constants.getColor = (string) => {
    return stringToColor(string);
};

Constants.getContrastColor = (hexcode) => {
    return getContrastColor(hexcode);
};

Constants.sidePanels = [
    { obj: <TestCoverageComponent />, key: "test" }
];

Constants.invisible = {
    Folder: false,
    Set: false
};

Constants.jiraAddresses = {
    Project: project => `http://jira.frequentis.frq/browse/${project}`,
    Defect: defect => `http://jira.frequentis.frq/browse/${defect}`,
    "Work Package": workpackage => `http://jira.frequentis.frq/browse/${workpackage}`,
    User: user => `https://jira.frequentis.frq/ViewProfile.jspa?name=${user}`
};

Constants.getJiraAddress = (type, key) => {
    return Constants.jiraAddresses[type] ? Constants.jiraAddresses[type](key) : null;
};

Constants.getJamaAddress = (jamaId, jamaProjectId) => {
    if (jamaProjectId && jamaId) {
        return `https://jama.frequentis.com/contour/perspective.req?docId=${jamaId}&projectId=${jamaProjectId}`;
    } else if (jamaId) {
        return `https://jama.frequentis.com/contour/perspective.req?projectId=${jamaId}`;
    }

    return null;
};

export default Constants;
