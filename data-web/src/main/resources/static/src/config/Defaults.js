export const UPSTREAM = "UPSTREAM";
export const DOWNSTREAM = "DOWNSTREAM";

const endpoints = {
    GeneralNode: "generalNodes",
    Project: "projects"
};

export const getEndpoint = (type) => {
    return type === "Project" ? endpoints.Project : endpoints.GeneralNode;
};

export const FEAT_DECOMPOSITION = ["FEAT", "SSS", "SRS", "PSRS", "WP"];

export const DESIGN = ["PRD", "UC", "SSDD", "HWC_IF", "SUSY_IF", "STY", "UIDD", "CSC_IF", "SUSY_IF"];
export const TEST = ["BUG", "TC", "WP", "TA", "TTC", "TSC"];
export const REQUIREMENT = ["SSS", "SRS", "FEAT", "CRQ", "BSR", "SAF", "SEC", "HRS", "REQ"];
