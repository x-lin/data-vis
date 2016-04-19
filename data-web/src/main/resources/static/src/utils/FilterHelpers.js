export default {
    getKeysMatching: (object, filterString) => {
        const toBeFiltered = [];

        for (const filter in object) {
            if (object[filter] === filterString) {
                toBeFiltered.push(filter);
            }
        }

        return toBeFiltered;
    },
    getIndicesByProperty: (array, propertyName, filterArray) => {
        const indices = [];

        if (filterArray.length > 0) {
            for (let i = 0; i < array.length; i++) {
                if (filterArray.indexOf(array[i][propertyName]) > -1 || filterArray.indexOf(array[i].type) > -1) {
                    indices.push(i);
                }
            }
        }

        return indices;
    },
    filterOutIndexValues: (array, indices) => {
        if (indices.length > 0) {
            return array.filter((element, index) => {
                return indices.indexOf(index) === -1;
            });
        } else {
            return array;
        }
    }
};

