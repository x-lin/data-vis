export const indexOfObjectInArrayByProperties = (array, properties) => {
    for (let i = 0; i < array.length; i++) {
        const object = array[i];
        let doesExist = true;

        for (const propertyKey in properties) {
            if ({}.hasOwnProperty.call(properties, propertyKey)) {
                const propertyValue = properties[propertyKey];

                if (object[propertyKey] !== propertyValue) {
                    doesExist = false;
                    break;
                }
            }
        }

        if (doesExist) {
            return i;
        }
    }

    return -1;
};

export const indexOfObjectInArrayByProperty = (array, propertyValue, propertyKey) => {
    const property = {};
    property[propertyKey] = propertyValue;

    return indexOfObjectInArrayByProperties(array, property);
};
