const Constants = {};

Constants.colorMap = {
    Project: "#716eb9",
    Issue : "#4d9ecd",
    Requirement : "#00a65a",
    User : "#f39c12",
    //Other : "rgb(150, 150, 150)"
};

Constants.reversePropertyMap= {
    Issue : "Issue",
    Project : "Project",
    User : "User",
    Requirement : "Requirement"
};

Constants.endpoints = {
    Issue: "issues",
        Project: "projects",
        User: "users ",
        Requirement: "reqs"
};

Constants.keyMap = {
    Project : "key",
        Issue : "key",
        User : "name",
        Requirement : "key"
};

Constants.defaultVisible = {
    Project : true,
        Issue : true,
        User : true,
        Requirement : true
};

Constants.getColor = (category) => {
    return Constants.colorMap[category] ? Constants.colorMap[category] : Constants.DEFAULT_COLOR;
};

Constants.DEFAULT_COLOR = "rgb(100,100,100)";

export default Constants;