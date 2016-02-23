const Constants = {};

Constants.colorMap = {
    Project: "rgb(163, 85, 143)",
    Issue : "rgb(140, 160, 255)",
    Requirement : "rgb(92, 200, 80)",
    User : "rgb(255, 170, 30)",
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