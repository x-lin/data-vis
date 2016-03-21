import stringToColor from "../utils/stringToColor";

const Constants = {};

//Constants.colorMap = {
//    Project: "#716eb9",
//    Ticket : "#4d9ecd",
//    User : "#f39c12",
//    Requirement : "#00b73f",
//    //Other : "rgb(150, 150, 150)"
//};

Constants.getColor = (category) => {
    return stringToColor(category);
    //return Constants.colorMap[category] ? Constants.colorMap[category] : Constants.DEFAULT_COLOR;
};

Constants.colorMap = {
    Project: Constants.getColor("Project"),
    Ticket : Constants.getColor("Ticket"),
    User : Constants.getColor("User"),
    Requirement : Constants.getColor("Requirement"),
    //Other : "rgb(150, 150, 150)"
};

Constants.reversePropertyMap= {
    Project : "Project",
    GeneralNode: "GeneralNode",
    //Project : "Project",
    Set: "Set"
};

Constants.endpoints = {
    GeneralNode: "generalNodes",
    Ticket: "issues",
    Project: "projects",
    User: "users ",
    Requirement: "reqs"
};

Constants.keyMap = {
    Project : "key",
    Ticket : "key",
    User : "name",
    Requirement : "key",
    GeneralNode: "key"
};

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

Constants.getKeyIdentifier = (category) => {
    return Constants.keyMap[category];
};

Constants.getJiraAddress = (type, key) => {
    return Constants.jiraAddresses[type] ? Constants.jiraAddresses[type](key) : null;
}

Constants.getJamaAddress = (jamaId, jamaProjectId) => {
    if(jamaProjectId) {
        return `https://jama.frequentis.com/contour/perspective.req?docId=${jamaId}&projectId=${jamaProjectId}`;
    } else if(jamaProjectId && jamaId) {
        return `https://jama.frequentis.com/contour/perspective.req?projectId=${jamaId}`;
    }
}

export default Constants;