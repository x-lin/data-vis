const STRING = "Just a test string";
const NUMBER = 0;
const NULL = null;
const BOOL = false;

const PRIMITIVES = [STRING, NUMBER, NULL, BOOL];

const NUM_ARRAY = [2, 0, 3, 5];
const STRING_ARRAY = ["string1", "string2", STRING];
const OBJECT = {prop1: STRING, prop2: NULL, prop3: NUMBER, prop4: { nestedProp: NUM_ARRAY }};

const NESTED = [NUM_ARRAY, OBJECT, STRING_ARRAY];

/**
 * Creates an action assigning a primitive value to each parameter
 *
 * @param type action type
 * @param params action parameters
 * @returns {Object} action
 */
export const createPrimitive = (type, params) => {
    const object = { type };

    processParams(params, (name, index) => {
        object[name] = pickPrimitive(index);
    });

    return object;
};

/**
 * Creates an action with nested property values
 *
 * @param type action type
 * @param params action parameters
 * @returns {Object} action
 */
export const createNested = (type, params) => {
    const object = { type };

    processParams(params, (name, index) => {
        object[name] = pickNested(index);
    });

    return object;
};

const processParams = (params, assign) => {
    if(typeof params === "string") {
        assign(params, 0);
    } else if(Array.isArray(params)) {
        params.forEach((name, index) => {
            assign(name, index);
        });
    }
};

const pickPrimitive = (index) => {
    return pick(index, PRIMITIVES);
};

const pickNested = (index) => {
    return pick(index, NESTED);
};

const pick = (index, array) => {
    return array[index % (array.length-1)];
};