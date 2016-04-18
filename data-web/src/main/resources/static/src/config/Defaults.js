export const UPSTREAM = "UPSTREAM";
export const DOWNSTREAM = "DOWNSTREAM";

const endpoints = {
    GeneralNode: "generalNodes",
    Project: "projects"
};

export const getEndpoint = (type) => {
    return type === "Project" ? endpoints.Project : endpoints.GeneralNode;
};

