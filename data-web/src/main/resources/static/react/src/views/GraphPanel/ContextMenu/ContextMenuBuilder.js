const ContextMenuBuilder = {};

ContextMenuBuilder.buildElement = (key, category) => {
    return $("#" + ContextMenuBuilder.buildElementId(key, category));
};

ContextMenuBuilder.buildElementId = (key, category) => {
    return "g" + key.replace(/^[^a-z]+|[^\w-]+/gi, "") + category;
};

ContextMenuBuilder.create = (element) => {
    element.popover({
        'trigger':'manual'
        ,'container': 'body'
        ,'placement': 'right'
        ,'white-space': 'nowrap'
        ,'html':'true'
    });

    return element;
};

ContextMenuBuilder.show = (element) => {
    element.popover("show");

    return element;
};

ContextMenuBuilder.removeAll = (selector) => {
    const select = selector || ".popover";

    $(select).remove();
};

export default ContextMenuBuilder;