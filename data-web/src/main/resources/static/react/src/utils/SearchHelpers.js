export const indexOfObjectInArrayByProperty = (array, propertyValue, propertyKey) => {
    const property = {};
    property[propertyKey] = propertyValue;

    return indexOfObjectInArrayByProperties(array, property);
};

export const indexOfObjectInArrayByProperties = (array, properties) => {
    for(let i = 0; i < array.length; i++) {
        let object = array[i];
        let doesExist = true;

        for(let propertyKey in properties) {
            const propertyValue = properties[propertyKey];
            if(object[propertyKey] !== propertyValue) {
                doesExist = false;
                break;
            }
        }

        if(doesExist) {
            return i;
        }
    }

    return -1;
};