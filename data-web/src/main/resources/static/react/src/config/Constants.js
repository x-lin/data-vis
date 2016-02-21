export default {
    colorMap: {
        Project: "rgb(163, 85, 143)",
        Issue : "rgb(140, 160, 255)",
        Requirement : "rgb(92, 200, 80)",
        User : "rgb(255, 170, 30)",
        //Other : "rgb(150, 150, 150)"
    },
    reversePropertyMap: {
        Issue : "Issue",
        Project : "Project",
        User : "User",
        Requirement : "Requirement"
    },
    endpoints: {
        Issue: "issues",
        Project: "projects",
        User: "users ",
        Requirement: "reqs"
    },
    keyMap: {
        Project : "key",
        Issue : "key",
        User : "name",
        Requirement : "key"
    },
    defaultVisible: {
        Project : true,
        Issue : true,
        User : true,
        Requirement : true
    },
};