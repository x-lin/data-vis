const Constants = {};

Constants.colorMap = {
    Project: "#716eb9",
    Ticket : "#4d9ecd",
    User : "#f39c12",
    Requirement : "#00a65a",
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

Constants.getColor = (category) => {
    return Constants.colorMap[category] ? Constants.colorMap[category] : Constants.DEFAULT_COLOR;
};

Constants.DEFAULT_COLOR = "rgb(100,100,100)";

export default Constants;