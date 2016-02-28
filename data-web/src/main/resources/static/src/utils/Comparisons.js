const Comparisons = {};

Comparisons.existsIndex = (index) => {
    return index > -1;
};

Comparisons.isEquals = (obj1, obj2) => {
    return obj1 === obj2;
};

export default Comparisons;