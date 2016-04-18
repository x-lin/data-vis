export const buildHttpParam = (key, value) => {
    if (key === "undefined" || key === null ||
        typeof value === "undefined" || value === null) {
        return "";
    }

    return `${key}=${value}`;
};

const getDelimiterWrapped = (string) => {
    if (string !== null && string.length > 0) {
        return `${string}&`;
    }

    return "";
};

const buildParamForArray = (key, array) => {
    return array.reduce((result, value) => {
        return getDelimiterWrapped(result) + buildHttpParam(key, value);
    }, "");
};

export const buildHttpParams = (params) => {
    return Object.keys(params).reduce((result, key) => {
        if (Array.isArray(params[key])) {
            return getDelimiterWrapped(result) + buildParamForArray(key, params[key]);
        } else if (params[key] !== null) {
            return getDelimiterWrapped(result) + buildHttpParam(key, params[key]);
        } else {
            return result;
        }
    }, "");
};
