export default (type, object) => {
    const obj = typeof object === "object" ? object : {};
    obj.type = type;

    return obj;
};
