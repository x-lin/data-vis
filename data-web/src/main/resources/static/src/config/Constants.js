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
    Ticket: ticket => `http://jira.frequentis.frq/browse/${ticket}`,
    User: user => `https://jira.frequentis.frq/ViewProfile.jspa?name=${user}`
};

Constants.getKeyIdentifier = (category) => {
    return Constants.keyMap[category];
};

Constants.getJiraAddress = (category, key) => {
    return Constants.jiraAddresses[category] ? Constants.jiraAddresses[category](key) : null;
}

Constants.getJamaAddress = (jamaId, jamaProjectId) => {
    if(jamaProjectId) {
        return `https://jama.frequentis.com/contour/perspective.req?docId=${jamaId}&projectId=${jamaProjectId}`;
    } else {
        return `https://jama.frequentis.com/contour/perspective.req?projectId=${jamaId}`;
    }
}

export default Constants;