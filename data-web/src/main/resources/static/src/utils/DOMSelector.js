const DOMSelector = {};

DOMSelector.getWidth = (selector) => {
    return $(selector).width();
};

DOMSelector.getHeight = (selector) => {
    return $(selector).height();
};


export default DOMSelector;
