const Constants = {};

Constants.colorMap = {
    Project: "#716eb9",
    Ticket : "#4d9ecd",
    User : "#f39c12",
    Requirement : "#00b73f",
    //Other : "rgb(150, 150, 150)"
};

Constants.reversePropertyMap= {
    Ticket : "Ticket",
    Project : "Project",
    User : "User",
    Requirement : "Requirement"
};

Constants.endpoints = {
    Ticket: "issues",
    Project: "projects",
    User: "users ",
    Requirement: "reqs"
};

Constants.keyMap = {
    Project : "key",
    Ticket : "key",
    User : "name",
    Requirement : "key"
};

Constants.defaultVisible = {
    Project : true,
    Ticket : true,
    User : true,
    Requirement : true
};

Constants.jiraAddresses = {
    Project: project => `http://jira.frequentis.frq/browse/${project}`,
    Ticket: ticket => `http://jira.frequentis.frq/browse/${ticket}`,
    User: user => `https://jira.frequentis.frq/ViewProfile.jspa?name=${user}`
};

Constants.getColor = (category) => {
    return Constants.colorMap[category] ? Constants.colorMap[category] : Constants.DEFAULT_COLOR;
};

Constants.getKeyIdentifier = (category) => {
    return Constants.keyMap[category];
};

Constants.getJiraAddress = (category, key) => {
    return Constants.jiraAddresses[category] ? Constants.jiraAddresses[category](key) : null;
}

Constants.DEFAULT_COLOR = "rgb(100,100,100)";

export default Constants;